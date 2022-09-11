import { useSession } from 'next-auth/react';
import type { Recipe, RecipeUpsertInput } from '../graphql/generated';
import type { ApolloError } from '@apollo/client';
import {
  useGetRecipesQuery,
  useGetRecipesLazyQuery,
  useGetTagsQuery,
  useGetMeQuery,
  useDeleteRecipeMutation,
  useUpsertRecipeMutation,
  useUpdateUserPreferencesMutation,
  useSearchRecipesLazyQuery,
  useDeleteTagsMutation,
  usePublishSiteMutation,
  useUnpublishSiteMutation,
  usePublishRecipeMutation,
  useImportRecipesMutation,
} from '../graphql/generated';

export function useRecipes() {
  return useGetRecipesQuery();
}

export function useLazyRecipes(callback: Function) {
  return useGetRecipesLazyQuery({
    onCompleted: (data) => callback(data),
  });
}

export function useSingleRecipe(recipeSlug: string) {
  const variables = {
    where: { slug: recipeSlug },
  };
  const { data, error, loading } = useGetRecipesQuery({ variables, skip: !recipeSlug });
  return {
    data,
    error: error || (!loading && data?.recipes.length === 0 ? { message: '404 recipe not found' } : null),
    loading,
  };
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
  const [mutate, results] = useUpsertRecipeMutation({ refetchQueries: ['GetRecipes', 'GetTags'] });
  function upsertRecipe({ recipeData, recipeId, tagsConnect, tagsCreate }: UpsertRawInput) {
    return mutate({
      variables: {
        recipeData: {
          ...recipeData,
          authorId,
        },
        recipeId,
        tagsConnect,
        tagsCreate,
      },
    });
  }
  return [upsertRecipe, results];
}

export function useDeleteRecipe() {
  return useDeleteRecipeMutation({ refetchQueries: ['GetRecipes', 'GetTags'] });
}

export function useDeleteTags() {
  return useDeleteTagsMutation({ refetchQueries: ['GetTags'] });
}

export function useTags() {
  return useGetTagsQuery();
}

export function useGetMe() {
  return useGetMeQuery();
}

export function useUpdateUserPreferences() {
  return useUpdateUserPreferencesMutation();
}

export function usePublishSite() {
  return usePublishSiteMutation({ refetchQueries: ['GetMe'] });
}

export function useUnpublishSite() {
  return useUnpublishSiteMutation({ refetchQueries: ['GetMe'] });
}

export function usePublishRecipe() {
  return usePublishRecipeMutation({ refetchQueries: ['GetRecipes'] });
}

export function useImportRecipes() {
  return useImportRecipesMutation({ refetchQueries: ['GetRecipes'] });
}

export function useSearchRecipes(): [
  Function,
  { error: ApolloError | undefined; data: Recipe[] | undefined; loading: boolean },
] {
  const [query, { data, error, loading }] = useSearchRecipesLazyQuery();
  function searchRecipes(searchQuery: string) {
    return query({
      variables: {
        searchQuery,
      },
    });
  }
  const searchResults = {
    loading,
    error: error,
    data: data?.searchRecipes,
  };
  return [searchRecipes, searchResults];
}
