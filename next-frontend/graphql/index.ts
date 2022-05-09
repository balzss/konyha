import { gql } from 'apollo-server-micro';
import prisma from '../prisma/prisma-client';

export const typeDefs = gql`
  type Tag {
    id: String!
    name: String!
  }

  type Recipe {
    id: String!
    slug: String!
    name: String!
    description: String
    ingredients: String!
    instructions: String!
    tags: [Tag]
  }

  type Query {
    recipe(slug: String!): Recipe!
    recipes: [Recipe!]!
  }
`;

export const resolvers = {
  Query: {
    recipe: async (parent, args, context) => {
      console.log(args)
      const { userId } = context?.session;
      const options = {
        where: {
          slug: args?.slug,
          authorId: userId,
        }
      };
      const recipe = await prisma.recipe.findFirst(options);
      return recipe;
    },
    recipes: async (parent, args, context) => {
      // only send their own recipes
      const { userId } = context?.session;
      const options = {
        include: {tags: true},
        where: {
          authorId: userId,
        }
      };
      const recipes = await prisma.recipe.findMany(options);
      return recipes;
    }
  }
};
