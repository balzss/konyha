import type { RawRecipe } from '../utils/types';
import { useSession } from 'next-auth/react';
import {
  useGetRecipesQuery,
  useGetTagsQuery,
  useDeleteRecipeMutation,
  useUpsertRecipeMutation,
  RecipeUpsertInput,
} from '../graphql/generated';

function slugify(input: string): string {
  return input
    ?.trim()
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

function formatTags(tags: string) {
  return tags
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag);
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
}

function useUpdateRecipe(): [Function, any] {
  const { data: sessionData } = useSession();
  const authorId = sessionData?.userId as string;
  const [mutate, results] = useUpsertRecipeMutation({refetchQueries: ['GetRecipes', 'GetTags']});
  function updateRecipe (recipeId: string, recipeData: Omit<RecipeUpsertInput, 'slug' | 'authorId'>, tagsConnect: string[], newTags: string) {
    return mutate({variables: {
      recipeData: {
        ...recipeData,
        authorId,
        slug: slugify(recipeData.name),
      },
      recipeId,
      tagsConnect,
      tagsCreate: formatTags(newTags),
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
