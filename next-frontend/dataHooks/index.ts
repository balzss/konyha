import useSWR from 'swr';
import { recipesFetcher, tagFetcher, singleRecipeFetcher } from './fetchers';
import { Recipe, Tag } from '../utils/types';

function useRecipes(): {
  recipes: Recipe[];
  loading: boolean;
  error: any;
  mutate: Function;
} {
  const { data, error, mutate } = useSWR('/recipes', recipesFetcher);
  return {
    recipes: data?.recipes,
    loading: !error && !data,
    error,
    mutate,
  };
}

function useSingleRecipe(recipeSlug: string): {
  recipe: Recipe;
  loading: boolean;
  error: any;
  mutate: Function;
} {
  const { data, error, mutate } = useSWR('/single-recipe', () => singleRecipeFetcher(recipeSlug));
  return {
    recipe: data?.recipes[0],
    loading: !error && !data,
    error,
    mutate,
  };
}

function useTags(): {
  tags: Tag[];
  loading: boolean;
  error: any;
  mutate: Function;
} {
  const { data, error, mutate } = useSWR('/tags', tagFetcher);
  return {
    tags: data?.tags,
    loading: !error && !data,
    error,
    mutate,
  };
}

export {
  useRecipes,
  useTags,
  useSingleRecipe,
};
