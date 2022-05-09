import type { Recipe, Tag, RawRecipe, RecipeRequest } from '../utils/types';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { request, GraphQLClient, gql } from 'graphql-request';
import {
  GET_RECIPES,
  GET_SINGLE_RECIPE,
  GET_TAGS,
} from './queries';
import {
  DELETE_RECIPE,
  UPDATE_RECIPE,
  CREATE_RECIPE,
} from './mutations';

const GRAPHQL_ENDPOINT = '/api/graphql';
const client = new GraphQLClient(GRAPHQL_ENDPOINT);

function authHeader(token: string) {
  return {
    'Authorization': `Bearer ${token}`
  };
}

function slugify(input: string): string {
  return input
    ?.trim()
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

function formatFields(rawFields: {description?: string | undefined, ingredients: string, instructions: string}) {
  const description = rawFields.description?.trim() ?? '';
  const ingredients = rawFields.ingredients?.split('\n').map((ingredient) => ingredient.trim()).join(',') ?? '';
  const instructions = rawFields.instructions?.split('\n').map((instruction) => instruction.trim()).join(',') ?? '';
  return {
    description,
    ingredients,
    instructions
  };
}

function formatTags(tags: string, userId: string) {
  return tags
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag)
    .map((tagName) => ({name: tagName, user_id: userId}));
}

function normaliseRecipeRequest(recipe: RecipeRequest) {
  return {
    ...recipe,
    ingredients: recipe.ingredients.split(','),
    instructions: recipe.instructions.split(','),
  };
}

function formatRecipeForMutation(recipeData: RawRecipe, userId: string = '1141c679-c91a-4785-89c4-3c919d819cc4') {
  const formattedNewTags = formatTags(recipeData.newTags ?? '', userId);
  const formattedExistingTags = recipeData.tags?.map((tagId) => ({id: tagId})) ?? [];
  const newTagsData = formattedNewTags.map((tagInner) => ({tag: {data: tagInner}}));
  const existingTagsData = formattedExistingTags.map((tagInner) => ({tag: {data: tagInner}}));
  const { description, ingredients, instructions } = formatFields(recipeData);
  return  {
    user_id: userId,
    name: recipeData.recipeName,
    slug: slugify(recipeData.recipeName),
    description,
    ingredients,
    instructions,
    tags: {
      data: [...newTagsData, ...existingTagsData],
    }
  };
}

function useRecipes() {
  return useQuery<Recipe[], Error>('recipes', async () => {
    const { recipes } = await client.request(GET_RECIPES);
    return recipes.map(normaliseRecipeRequest);
  });
}

function useSingleRecipe(recipeSlug: string) {
  return useQuery<Recipe, Error>(['recipes', recipeSlug], async () => {
    const { recipe } = await client.request(
      GET_SINGLE_RECIPE,
      { recipeSlug },
    );
    return normaliseRecipeRequest(recipe);
  }, {enabled: !!recipeSlug});
}

function useCreateRecipe() {
  const queryClient = useQueryClient();
  return useMutation(async ({recipeData, sessionToken}: {recipeData: RawRecipe, sessionToken: string}) => {
    const { insert_recipes_one } = await client.request(
      CREATE_RECIPE,
      { recipeData: formatRecipeForMutation(recipeData) },
      authHeader(sessionToken),
    );
    return insert_recipes_one;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
    },
  });
}

function useUpdateRecipe() {
  const queryClient = useQueryClient();
  return useMutation(async ({recipeData, recipeId, sessionToken}: {recipeData: RawRecipe, recipeId: string, sessionToken: string}) => {
    const { update_recipes_by_pk } = await client.request(
      UPDATE_RECIPE,
      {
        recipeId,
        recipeData: formatRecipeForMutation(recipeData),
      },
      authHeader(sessionToken),
    );
    return update_recipes_by_pk;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
    },
  });
}

function useDeleteRecipe() {
  const queryClient = useQueryClient();
  return useMutation(async ({recipeId, sessionToken}: {recipeId: string; sessionToken: string}) => {
    const response = await client.request(
      DELETE_RECIPE,
      { recipeId },
      authHeader(sessionToken),
    );
    return response;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
    },
  });
}

function useTags(sessionToken: string) {
  return useQuery<Array<Tag  & { recipesCount: number }>, Error>('tags', async () => {
    const { tags } = await client.request(
      GET_TAGS,
      {},
      authHeader(sessionToken),
    );
    return tags;
  }, {
    onSuccess: (_tags) => {
      // TODO handle deletable tags here
    },
    enabled: !!sessionToken,
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
