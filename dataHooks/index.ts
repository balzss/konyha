import { useSession } from 'next-auth/react';
import {
  useGetRecipesQuery,
  useGetTagsQuery,
  useDeleteRecipeMutation,
  useUpsertRecipeMutation,
  RecipeUpsertInput,
  useUpdateUserPreferencesMutation,
} from '../graphql/generated';

function slugify(input: string): string {
  return input
    ?.trim()
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

export function useRecipes() {
  return useGetRecipesQuery();
}

export function useSingleRecipe(recipeSlug: string) {
  const variables = {
    where: {slug: recipeSlug},
  };
  return useGetRecipesQuery({ variables, skip: !recipeSlug });
}

type UpsertRawInput = {
  recipeId: string;
  recipeData: Omit<RecipeUpsertInput, 'slug' | 'authorId'>;
  tagsConnect: string[];
  tagsCreate: string[];
};

export function useUpsertRecipe(): [Function, any] {
  const { data: sessionData } = useSession();
  const authorId = sessionData?.userId as string;
  const [mutate, results] = useUpsertRecipeMutation({refetchQueries: ['GetRecipes', 'GetTags']});
  function upsertRecipe({recipeData, recipeId, tagsConnect, tagsCreate}: UpsertRawInput) {
    return mutate({variables: {
      recipeData: {
        ...recipeData,
        authorId,
        slug: slugify(recipeData.name),
      },
      recipeId,
      tagsConnect,
      tagsCreate,
    }});
  }
  return [upsertRecipe, results];
}

export function useDeleteRecipe() {
  return useDeleteRecipeMutation({refetchQueries: ['GetRecipes', 'GetTags']});
}

export function useTags() {
  return useGetTagsQuery();
}

export function useUpdateUserPreferences() {
  return useUpdateUserPreferencesMutation();
}
