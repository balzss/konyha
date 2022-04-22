import { Recipe, Tag } from '../utils/types';
import { useQuery } from 'react-query';
import { request, gql } from "graphql-request";

const GRAPHQL_ENDPOINT = 'http://localhost:8000/api/graphql';

function useRecipes() {
  return useQuery<Recipe[], Error>('recipes', async () => {
    const { recipes } = await request(
      GRAPHQL_ENDPOINT,
      gql`
        query {
          recipes {
            id
            name
            slug
            description
            tags {
              id
              name
            }
          }
        }
      `
    );
    return recipes;
  });
}

function useSingleRecipe(recipeSlug: string) {
  return useQuery<Recipe, Error>(['recipe', recipeSlug], async () => {
    const { recipes } = await request(
      GRAPHQL_ENDPOINT,
      gql`
        query {
          recipes(where: {slug: {equals: "${recipeSlug}"}}) {
            id
            name
            slug
            description
            tags {
              id
              name
            }
          }
        }
      `
    );
    return recipes[0];
  }, {enabled: !!recipeSlug});
}

function useTags() {
  return useQuery<Tag[], Error>('tags', async () => {
    const { tags } = await request(
      GRAPHQL_ENDPOINT,
      gql`
        query {
          tags {
            id
            name
        }
        }
      `
    );
    return tags;
  });
}

export {
  useRecipes,
  useTags,
  useSingleRecipe,
};
