import {
  AuthenticationError,
  ForbiddenError,
} from 'apollo-server-micro';
import type { Resolvers, Tag } from './generated';
import slugify from '../utils/slugify';

const resolvers: Resolvers = {
  Query: {
    recipes: async (_, {where}, {prisma, session}) => {
      if (!session) {
        throw new AuthenticationError('No session found, please log in!');
      }
      const { userId } = session;
      const options = {
        include: {tags: true},
        where: {
          ...(where?.tags && {
            tags: {
              slug: {
                in: where.tags,
              }
            }
          }),
          ...(where?.slug && {
            slug: where.slug,
          }),
          authorId: userId,
        }
      };
      const recipes = await prisma.recipe.findMany(options);
      return recipes;
    },
    tags: async (_, {}, {prisma, session}) => {
      if (!session) {
        throw new AuthenticationError('No session found, please log in!');
      }
      const { userId } = session;
      const options = {
        where: {
          ownerId: userId,
        }
      };
      const tags = await prisma.tag.findMany(options);
      return tags;
    },
    searchRecipes: async (_, {query}, {prisma, session}) => {
      if (!session) {
        throw new AuthenticationError('No session found, please log in!');
      }
      const { userId } = session;
      const options = {
        include: {tags: true},
        where: {
          authorId: userId,
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        }
      };
      const recipes = await prisma.recipe.findMany(options);
      return recipes;
    },
  },
  Mutation: {
    deleteRecipe: async (_, {slug}, {prisma, session}) => {
      if (!session) {
        throw new AuthenticationError('No session found, please log in!');
      }
      const { userId } = session;
      const options = {
        where: {
          authorId: userId,
          slug,
        }
      };
      const deletedRecipe = await prisma.recipe.deleteMany(options);
      return !!deletedRecipe;
    },
    upsertRecipe: async (_, {id, data, tagsConnect, tagsCreate}, {prisma, session}) => {
      if (!session) {
        throw new AuthenticationError('No session found, please log in');
      }
      const { userId } = session;
      if (data.authorId !== userId) {
        throw new ForbiddenError('Not authorized for this action');
      }

      // handle slug collision
      const baseSlug = slugify(data.name);
      const recipesWithSameSlug = await prisma.recipe.findMany({
        where: {
          id: {
            not: id ?? '',
          },
          slug: {
            startsWith: baseSlug,
          }
        }
      });
      const slug = baseSlug + (recipesWithSameSlug.length || '');

      const formattedTags = tagsConnect.map((tagId) => ({id: tagId}));

      // handle tag slug collision
      const userTags = await prisma.tag.findMany({
        where: {
          ownerId: userId,
        }
      });

      const newTags = tagsCreate.map((tagName) => {
        const tagBaseSlug = slugify(tagName);
        const tagSlugOverlap = userTags.filter(({slug}: Tag) => slug?.startsWith(tagBaseSlug));
        return {
          name: tagName,
          ownerId: userId,
          slug: tagBaseSlug + (tagSlugOverlap.length || ''),
        };
      });

      const options = {
        where: {
          id: id ?? '',
        },
        update: {
          ...data,
          slug,
          tags: {
            set: formattedTags,
            create: newTags,
          }
        },
        create: {
          ...data,
          slug,
          tags: {
            connect: formattedTags,
            create: newTags,
          }
        },
      };
      const upsertRecipe = await prisma.recipe.upsert(options);
      return upsertRecipe;
    },
    updateUserPreferences: async (_, {preferences}, {prisma, session}) => {
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
        }
      };
      const updatedPreferences = await prisma.user.update(options);
      return updatedPreferences;
    },
  }
};

export default resolvers;
