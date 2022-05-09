import { gql } from 'graphql-request';

export const GET_RECIPES = gql`
query GetRecipes {
  recipes {
    id
    name
    slug
    description
    ingredients
    instructions
    tags {
      id
      name
    }
  }
}
`;

export const GET_SINGLE_RECIPE = gql`
query GetSingleRecipe ($recipeSlug: String!){
  recipe(slug: $recipeSlug) {
    id
    name
    slug
    description
    ingredients
    instructions
    tags {
      id
      name
    }
  }
}
`;

export const GET_TAGS = gql`
query GetTags {
  tags {
    id
    name
  }
}
`;
