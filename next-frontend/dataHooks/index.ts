import type { Recipe, Tag, RawRecipe, RecipeRequest } from '../utils/types';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useSession } from 'next-auth/react';
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

const GRAPHQL_ENDPOINT = 'http://192.168.1.76:8000/v1/graphql';
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

function formatTags(tags: string) {
  return tags
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag)
    .map((tagName) => ({name: tagName}));
}

function normaliseRecipeRequest(recipe: RecipeRequest) {
  return {
    ...recipe,
    ingredients: recipe.ingredients.split(','),
    instructions: recipe.instructions.split(','),
    tags: recipe.tags.map((tagObject) => tagObject.tag),
  };
}

function formatRecipeForMutation(recipeData: RawRecipe, withoutTags = false) {
  const formattedNewTags = formatTags(recipeData.newTags ?? '');
  const formattedExistingTags = recipeData.tags?.map((tagId) => ({id: tagId})) ?? [];
  const tagsData = formattedNewTags.map((tagInner) => ({tag: {data: tagInner}}));
  const { description, ingredients, instructions } = formatFields(recipeData);
  return  {
    name: recipeData.recipeName,
    slug: slugify(recipeData.recipeName),
    description,
    ingredients,
    instructions,
    ...(!withoutTags && {
      tags: {
        data: tagsData,
      }
    }),
  };
}

function useRecipes(sessionToken: string) {
  return useQuery<Recipe[], Error>('recipes', async () => {
    const { recipes } = await client.request(GET_RECIPES, {}, authHeader(sessionToken));
    return recipes.map(normaliseRecipeRequest);
  }, {enabled: !!sessionToken});
}

function useSingleRecipe(recipeSlug: string, sessionToken: string) {
  return useQuery<Recipe, Error>(['recipes', recipeSlug], async () => {
    const { recipes } = await client.request(
      GET_SINGLE_RECIPE,
      { recipeSlug },
      authHeader(sessionToken),
    );
    return normaliseRecipeRequest(recipes[0]);
  }, {enabled: !!recipeSlug && !!sessionToken});
}

function useCreateRecipe() {
  const queryClient = useQueryClient();
  return useMutation(async (recipeData: RawRecipe) => {
    const { insert_recipes_one } = await request(
      GRAPHQL_ENDPOINT,
      CREATE_RECIPE,
      { recipeData: formatRecipeForMutation(recipeData) },
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
  return useMutation(async ({recipeData, recipeId}: {recipeData: RawRecipe, recipeId: string}) => {
    const { update_recipes_by_pk } = await request(
      GRAPHQL_ENDPOINT,
      UPDATE_RECIPE,
      {
        recipeId,
        recipeData: formatRecipeForMutation(recipeData, true),
      },
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
  return useMutation(async (recipeId: string) => {
    const response = await request(
      GRAPHQL_ENDPOINT,
      DELETE_RECIPE,
      { recipeId }
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
