import {
  AuthenticationError,
  ForbiddenError,
} from 'apollo-server-micro';
import type { Resolvers } from './generated';
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
          ...where,
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
      const formattedTags = tagsConnect.map((tagId) => ({id: tagId}));
      const newTags = tagsCreate.map((tagName) => ({name: tagName, ownerId: userId}));

      // handle slug collision
      const baseSlug = slugify(data.name);
      const recipesWithSameSlug = await prisma.recipe.findMany({
        where: {
          NOT: {
            id: id ?? '',
          },
          slug: {
            startsWith: baseSlug,
          }
        }
      });
      const slug = baseSlug + (recipesWithSameSlug.length || '');

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
