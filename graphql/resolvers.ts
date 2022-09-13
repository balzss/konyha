import { AuthenticationError, ForbiddenError } from 'apollo-server-micro';
import type { Resolvers, Tag } from './generated';
import slugify from '../utils/slugify';
import getUniqueName from '../utils/getUniqueName';
import fetch from 'node-fetch';

async function unpublishSite(userId: string) {
  try {
    const response = await fetch(`http://${process.env.HOST}:7777/api/publish`, {
      method: 'delete',
      body: JSON.stringify({
        ownerId: userId,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const responseData = await response.json();
    return {
      unpublishOptions: responseData,
    };
  } catch (error) {
    return {
      error: error as string,
      unpublishOptions: {},
    };
  }
}
async function publishSite(userId: string, prisma: any, publishOptions: any = {}) {
  const recipesOptions = {
    include: { tags: true },
    where: {
      authorId: userId,
    },
  };
  const recipes = await prisma.recipe.findMany(recipesOptions);

  try {
    const response = await fetch(`http://${process.env.HOST}:7777/api/publish`, {
      method: 'post',
      body: JSON.stringify({
        publishId: publishOptions?.publishId || '',
        ownerId: userId,
        recipes,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const responseData = await response.json();
    console.log({ responseData });
    return {
      publishOptions: responseData,
    };
  } catch (error) {
    return {
      error: error as string,
      publishOptions: {
        published: publishOptions.published,
        publishId: publishOptions.publishId,
      },
    };
  }
}

const resolvers: Resolvers = {
  ResponseData: {
    __resolveType: (response) => {
      // TODO why doesn't `response.__typename` work?
      if ('email' in response) {
        return 'Me';
      } else if ('ingredients' in response) {
        return 'Recipe';
      }
      return null;
    },
  },
  Query: {
    recipes: async (_, { where }, { prisma, session }) => {
      if (!session) {
        throw new AuthenticationError('No session found, please log in!');
      }
      const { userId } = session;
      const options = {
        include: { tags: true },
        where: {
          ...(where?.tags && {
            tags: {
              slug: {
                in: where.tags,
              },
            },
          }),
          ...(where?.slug && {
            slug: where.slug,
          }),
          authorId: userId,
        },
      };
      const recipes = await prisma.recipe.findMany(options);
      return recipes;
    },
    tags: async (_, {}, { prisma, session }) => {
      if (!session) {
        throw new AuthenticationError('No session found, please log in!');
      }
      const { userId } = session;
      const options = {
        where: {
          ownerId: userId,
        },
      };
      const tags = await prisma.tag.findMany(options);
      return tags;
    },
    searchRecipes: async (_, { query }, { prisma, session }) => {
      if (!session) {
        throw new AuthenticationError('No session found, please log in!');
      }
      const { userId } = session;
      const options = {
        include: { tags: true },
        where: {
          authorId: userId,
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
      };
      const recipes = await prisma.recipe.findMany(options);
      return recipes;
    },
    me: async (_, {}, { prisma, session }) => {
      if (!session) {
        throw new AuthenticationError('No session found, please log in!');
      }
      const { userId } = session;
      const options = {
        where: {
          id: userId,
        },
      };
      const me = await prisma.user.findUnique(options);
      return me;
    },
  },
  Mutation: {
    deleteRecipe: async (_, { slug }, { prisma, session }) => {
      if (!session) {
        throw new AuthenticationError('No session found, please log in!');
      }
      const { userId } = session;
      const options = {
        where: {
          authorId: userId,
          slug,
        },
      };
      const deletedRecipe = await prisma.recipe.deleteMany(options);
      return !!deletedRecipe;
    },
    upsertRecipe: async (_, { id, data, tagsConnect, tagsCreate }, { prisma, session }) => {
      if (!session) {
        throw new AuthenticationError('No session found, please log in');
      }
      const { userId } = session;
      if (!data.authorId || data.authorId !== userId) {
        throw new ForbiddenError('Not authorized for this action');
      }

      // handle slug collision
      // const baseSlug = slugify(data.name);
      const recipeWithSameName = await prisma.recipe.findMany({
        where: {
          id: {
            not: id ?? '',
          },
          name: {
            startsWith: data.name,
          },
        },
      });

      const newName = getUniqueName(
        data.name,
        recipeWithSameName.map((r: any) => r.name),
      );
      console.log({ recipeWithSameName: recipeWithSameName.map((r: any) => r.name), newName });
      const slug = slugify(newName);

      const formattedTags = tagsConnect.map((tagId) => ({ id: tagId }));

      // handle tag slug collision
      const userTags = await prisma.tag.findMany({
        where: {
          ownerId: userId,
        },
      });

      const newTags = tagsCreate.map((tagName) => {
        const tagBaseSlug = slugify(tagName);
        const tagSlugOverlap = userTags.filter(({ slug }: Tag) => slug?.startsWith(tagBaseSlug));
        return {
          name: tagName,
          ownerId: userId,
          slug: tagBaseSlug + (tagSlugOverlap.length || ''),
        };
      });

      const options = {
        include: { tags: true },
        where: {
          id: id ?? '',
        },
        update: {
          ...data,
          name: newName,
          slug,
          tags: {
            set: formattedTags,
            create: newTags,
          },
        },
        create: {
          ...data,
          name: newName,
          slug,
          tags: {
            connect: formattedTags,
            create: newTags,
          },
        },
      };
      const upsertRecipe = await prisma.recipe.upsert(options);
      try {
        await publishSite(userId, prisma);
      } catch (e) {
        return {
          message: 'error',
          error: e as string,
        };
      }

      return {
        message: 'success',
        data: upsertRecipe,
      };
    },
    updateUserPreferences: async (_, { preferences }, { prisma, session }) => {
      if (!session) {
        throw new AuthenticationError('No session found, please log in!');
      }
      const { userId } = session;
      const options = {
        where: {
          id: userId,
        },
        data: {
          preferences,
        },
      };
      const updatedPreferences = await prisma.user.update(options);
      return updatedPreferences;
    },
    deleteTags: async (_, { ids }, { prisma, session }) => {
      if (!session) {
        throw new AuthenticationError('No session found, please log in!');
      }
      const { userId } = session;
      const options = {
        where: {
          ownerId: userId,
          id: {
            in: ids,
          },
        },
      };
      const deletedTag = await prisma.tag.deleteMany(options);
      return !!deletedTag;
    },
    publishSite: async (_, { publishOptions }, { prisma, session }) => {
      if (!session) {
        throw new AuthenticationError('No session found, please log in!');
      }
      const { userId } = session;

      const publishResponse = await publishSite(userId, prisma, publishOptions);

      console.log({ publishResponse });

      if (publishResponse.publishOptions.message === 'error') {
        console.log('error');
        return {
          message: 'error',
          error: publishResponse.publishOptions.error,
        };
      }

      const options = {
        where: {
          id: userId,
        },
        data: {
          publishOptions: publishResponse.publishOptions,
        },
      };
      const updatedPreferences = await prisma.user.update(options);

      return {
        message: 'success',
        data: updatedPreferences,
      };
    },
    unpublishSite: async (_, {}, { prisma, session }) => {
      if (!session) {
        throw new AuthenticationError('No session found, please log in!');
      }
      const { userId } = session;

      const unpublishResponse = await unpublishSite(userId);

      if (unpublishResponse.unpublishOptions.message === 'error') {
        console.log('error');
        return {
          message: 'error',
          error: unpublishResponse.unpublishOptions.error,
        };
      }

      const options = {
        where: {
          id: userId,
        },
        data: {
          publishOptions: unpublishResponse.unpublishOptions,
        },
      };
      const updatedPreferences = await prisma.user.update(options);

      return {
        message: 'success',
        data: updatedPreferences,
      };
    },
    publishRecipe: async (_, { recipeSlug, publishState }, { prisma, session }) => {
      if (!session) {
        throw new AuthenticationError('No session found, please log in!');
      }
      const { userId } = session;

      const options = {
        where: {
          authorId: userId,
          slug: recipeSlug ?? '',
        },
        data: {
          published: publishState,
        },
      };
      const updateRecipe = await prisma.recipe.updateMany(options);
      try {
        await publishSite(userId, prisma);
      } catch (e) {
        return {
          message: 'error',
          error: e as string,
        };
      }

      return {
        message: 'success',
      };
    },
    importRecipes: async (_, { data }, { prisma, session }) => {
      if (!session) {
        throw new AuthenticationError('No session found, please log in!');
      }
      const { userId } = session;

      // TODO handle tags
      //   - check if tags exsist
      //   - create new tags that don't exist
      // TODO handle slug collision
      //   - options: override, ignore, rename
      const options = {
        data: [...data.map((r) => ({ ...r, authorId: userId }))],
      };
      const createRecipes = await prisma.recipe.createMany(options);

      return {
        message: 'success',
      };
    },
  },
};

export default resolvers;
