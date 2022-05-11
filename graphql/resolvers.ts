import { AuthenticationError } from 'apollo-server-micro';
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
    updateRecipe: async (_, {slug, data}, {prisma, session}) => {
      if (!session) {
        throw new AuthenticationError('No session found, please log in!');
      }
      const { userId } = session;
      const options = {
        where: {
          authorId: userId,
          slug,
        },
        data: {},
      };
      const updatedRecipe = await prisma.recipe.update(options);
      return updatedRecipe;
    },
  }
};

export default resolvers;
