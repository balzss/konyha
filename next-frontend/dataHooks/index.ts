import { Recipe, Tag, RawRecipe } from '../utils/types';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { request, gql } from 'graphql-request';

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
  return useQuery<Recipe, Error>(['recipes', recipeSlug], async () => {
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

function useCreateRecipe() {
  const queryClient = useQueryClient();
  return useMutation(async (recipeData: RawRecipe) => {
    const formattedNewTags =
      recipeData.newTags
        ?.split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag)
        .map((tag) => `{name: "${tag}"}`)
        .join(', ');
    const formattedExistingTags = recipeData.tags?.map((tag) => `{id: "${tag}"}`);
    const recipeDataString = `{
      name: "${recipeData.recipeName}",
      description: "${recipeData.description}",
      tags: {
        create: [${formattedNewTags}],
        connect: [${formattedExistingTags}]
      }
    }`;
    const { createRecipe } = await request(
      GRAPHQL_ENDPOINT,
      gql`
        mutation {
          createRecipe(data: ${recipeDataString}) {
            id
            slug
          }
        }
      `,
    );
    return createRecipe;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
    },
  });
}

function useUpdateRecipe() {
  const queryClient = useQueryClient();
  return useMutation(async ({recipeData, recipeSlug}: {recipeData: RawRecipe, recipeSlug: string}) => {
    const formattedNewTags =
      recipeData.newTags
        ?.split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag)
        .map((tag) => `{name: "${tag}"}`)
        .join(', ');
    const formattedExistingTags = recipeData.tags?.map((tag) => `{id: "${tag}"}`);
    const recipeDataString = `{
      name: "${recipeData.recipeName}",
      description: "${recipeData.description}",
      tags: {
        create: [${formattedNewTags}],
        connect: [${formattedExistingTags}]
      }
    }`;
    // TODO disconnect tags that arent used anymore
    const { updateRecipe } = await request(
      GRAPHQL_ENDPOINT,
      gql`
        mutation {
          updateRecipe(where: {slug: "${recipeSlug}"}, data: ${recipeDataString}) {
            id
            slug
          }
        }
      `,
    );
    return updateRecipe;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
    },
  });
}

function useDeleteRecipe() {
  const queryClient = useQueryClient();
  return useMutation(async (recipeSlug: string) => {
    const response = await request(
      GRAPHQL_ENDPOINT,
      gql`
        mutation {
          deleteRecipe(where: {slug: "${recipeSlug}"}) {
            id
            slug
          }
        }
      `,
    );
    return response;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
    },
  });
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
  useCreateRecipe,
  useDeleteRecipe,
  useUpdateRecipe,
};
