import { useSession } from 'next-auth/react';
import type {
  Recipe,
  RecipeUpsertInput,
} from '../graphql/generated';
import type {
  ApolloError,
} from '@apollo/client'
import {
  useGetRecipesQuery,
  useGetTagsQuery,
  useDeleteRecipeMutation,
  useUpsertRecipeMutation,
  useUpdateUserPreferencesMutation,
  useSearchRecipesLazyQuery,
} from '../graphql/generated';

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

export function useSearchRecipes(): [Function, { error: ApolloError | undefined, data: Recipe[] | undefined}] {
  const [query, {data, error, loading}] = useSearchRecipesLazyQuery();
  function searchRecipes(searchQuery: string) {
    return query({
      variables: {
        searchQuery,
      }
    })
  }
  const searchResults = {
    loading,
    error: error,
    data: data?.searchRecipes,
  };
  return [searchRecipes, searchResults];
}
