import type { Resolvers } from './generated';

const resolvers: Resolvers = {
  Query: {
    recipe: async (_, {slug}, {prisma, session}) => {
      const { userId } = session;
      const options = {
        include: {tags: true},
        where: {
          slug,
          authorId: userId,
        }
      };
      const recipe = await prisma.recipe.findFirst(options);
      return recipe;
    },
    recipes: async (_, {}, {prisma, session}) => {
      // only send their own recipes
      const { userId } = session;
      const options = {
        include: {tags: true},
        where: {
          authorId: userId,
        }
      };
      const recipes = await prisma.recipe.findMany(options);
      return recipes;
    },
    tags: async (_, {}, {prisma, session}) => {
      const { userId } = session;
      const options = {
        where: {
          ownerId: userId,
        }
      };
      const tags = await prisma.tag.findMany(options);
      return tags;
    }
  }
};

export default resolvers;
