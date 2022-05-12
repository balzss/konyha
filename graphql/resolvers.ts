import {
  AuthenticationError,
  ForbiddenError,
} from 'apollo-server-micro';
import type { Resolvers } from './generated';

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
      const options = {
        where: {
          id,
        },
        update: {
          ...data,
          tags: {
            set: formattedTags,
            create: newTags,
          }
        },
        create: {
          ...data,
        },
      };
      const upsertRecipe = await prisma.recipe.upsert(options);
      return upsertRecipe;
    },
  }
};

export default resolvers;
