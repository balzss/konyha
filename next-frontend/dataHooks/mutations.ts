import { gql } from 'graphql-request';

export const DELETE_RECIPE = gql`
mutation DeleteRecipe ($recipeId: uuid!) {
  delete_recipes_by_pk(id: $recipeId) {
    id
    slug
  }
}
`;
