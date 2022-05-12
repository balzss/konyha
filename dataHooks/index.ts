import type { RawRecipe } from '../utils/types';
import { useSession } from 'next-auth/react';
import {
  CREATE_RECIPE,
} from './mutations';
import {
  useGetRecipesQuery,
  useGetTagsQuery,
  useDeleteRecipeMutation,
  useUpsertRecipeMutation,
  RecipeUpsertInput,
} from '../graphql/generated';

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
  return useGetRecipesQuery();
}

function useSingleRecipe(recipeSlug: string) {
  const variables = {
    where: {slug: recipeSlug},
  };
  return useGetRecipesQuery({ variables, skip: !recipeSlug });
}

function useCreateRecipe() {
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

function useUpdateRecipe(): [Function, any] {
  const { data: sessionData } = useSession();
  const authorId = sessionData?.userId as string;
  const [mutate, results] = useUpsertRecipeMutation();
  function updateRecipe (recipeId: string, recipeData: Omit<RecipeUpsertInput, 'slug' | 'authorId'>) {
    return mutate({variables: {
      recipeData: {
        ...recipeData,
        authorId,
        slug: slugify(recipeData.name),
      },
      recipeId,
    }});
  }
  return [updateRecipe, results];
}

function useDeleteRecipe() {
  return useDeleteRecipeMutation();
}

function useTags() {
  return useGetTagsQuery();
}

export {
  useRecipes,
  useTags,
  useSingleRecipe,
  useCreateRecipe,
  useDeleteRecipe,
  useUpdateRecipe,
};
