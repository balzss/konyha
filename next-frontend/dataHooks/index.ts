import { Recipe, Tag, RawRecipe } from '../utils/types';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { request, gql } from 'graphql-request';

const GRAPHQL_ENDPOINT = 'http://192.168.1.76:8000/api/graphql';

function formatFields(rawFields: {description?: string | undefined, ingredients: string, instructions: string}) {
  const description = rawFields.description?.trim() ?? '';
  const ingredients = rawFields.ingredients?.split('\n').map((ingredient) => `"${ingredient.trim()}"`).join(',') ?? '';
  const instructions = rawFields.instructions?.split('\n').map((instruction) => `"${instruction.trim()}"`).join(',') ?? '';
  return {
    description,
    ingredients,
    instructions
  };
}

function formatTags(tags: string) {
  return tags
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag)
    .map((tag) => `{name: "${tag}"}`)
    .join(', ');
}

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
            ingredients
            instructions
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
            ingredients
            instructions
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
    const formattedNewTags = formatTags(recipeData.newTags ?? '');
    const formattedExistingTags = recipeData.tags?.map((tag) => `{id: "${tag}"}`);
    const { description, ingredients, instructions } = formatFields(recipeData);
    const recipeDataString = `{
      name: "${recipeData.recipeName}",
      description: "${description}",
      ingredients: [${ingredients}],
      instructions: [${instructions}],
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
    const formattedNewTags = formatTags(recipeData.newTags ?? '');
    const formattedExistingTags = recipeData.tags?.map((tag) => `{id: "${tag}"}`);
    const { description, ingredients, instructions } = formatFields(recipeData);
    const recipeDataString = `{
      name: "${recipeData.recipeName}",
      description: "${description}",
      ingredients: [${ingredients}],
      instructions: [${instructions}],
      tags: {
        create: [${formattedNewTags}],
        set: [${formattedExistingTags}]
      }
    }`;
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
  const { mutate: deleteTags } = useDeleteTags();
  return useQuery<Array<Tag  & { recipesCount: number }>, Error>('tags', async () => {
    const { tags } = await request(
      GRAPHQL_ENDPOINT,
      gql`
        query {
          tags {
            id
            name
            recipesCount
          }
        }
      `
    );
    return tags;
  }, {
    onSuccess: (tags) => {
      const deleteCandidates = tags.filter((tag) => !tag.recipesCount);
      if (deleteCandidates.length) {
        deleteTags(deleteCandidates.map((tag) => `{id: "${tag.id}"}`));
      }
    },
  });
}

function useDeleteTags() {
  const queryClient = useQueryClient();
  return useMutation(async (tagIds: string[]) => {
    const response = await request(
      GRAPHQL_ENDPOINT,
      gql`
        mutation {
          deleteTags(where: [${tagIds.join(',')}]) {
            id
          }
        }
      `,
    );
    return response;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('tags');
    },
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
