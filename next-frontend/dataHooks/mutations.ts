import { gql } from 'graphql-request';

export const DELETE_RECIPE = gql`
mutation DeleteRecipe ($recipeId: uuid!) {
  delete_recipes_by_pk(id: $recipeId) {
    id
    slug
  }
}
`;

export const CREATE_RECIPE = gql`
mutation CreateRecipe ($recipeData: recipes_insert_input!) {
  insert_recipes_one(object: $recipeData) {
    id
    slug
  }
}
`;

export const UPDATE_RECIPE = gql`
mutation UpdateRecipe ($recipeId: uuid!, $recipeData: recipes_set_input!) {
  update_recipes_by_pk(pk_columns: {id: $recipeId}, _set: $recipeData) {
    id
    slug
  }
}
`;
