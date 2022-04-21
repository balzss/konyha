import useSWR from 'swr';
import { recipesFetcher } from './fetchers';
import { Recipe } from '../utils/types';

function useRecipes(): {
  recipes: Recipe[];
  loading: boolean;
  error: any;
  mutate: Function;
} {
  const { data, error, mutate } = useSWR('arg', recipesFetcher);
  return {
    recipes: data?.recipes,
    loading: !error && !data,
    error,
    mutate,
  };
}

export {
  useRecipes,
};
