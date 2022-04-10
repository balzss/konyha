import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getRecipes, saveNewRecipe, updateRecipe, deleteRecipe } from '../utils/api';
import { RecipeState, RawRecipe } from '../utils/types';

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  return await getRecipes();
});

export const addRecipe = createAsyncThunk('recipes/addRecipe', async (newRecipe: RawRecipe) => {
  return await saveNewRecipe(newRecipe);
});

export const editRecipe = createAsyncThunk('recipes/editRecipe', async ({updatedRecipe, recipeId}: {updatedRecipe: RawRecipe, recipeId: string}) => {
  return await updateRecipe(updatedRecipe, recipeId);
});

export const removeRecipe = createAsyncThunk('recipes/removeRecipe', async (recipeId: string) => {
  await deleteRecipe(recipeId);
  return recipeId;
});

const initialState: RecipeState = {
  recipes: [],
  status: 'idle',
  error: '',
};

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRecipes.pending, (state, _action) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, _action) => {
        state.status = 'failed';
        state.error = 'Failed to fetch recipes';
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.recipes.push(action.payload);
      })
      .addCase(editRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.map((recipe) => recipe.id === action.payload.id ? action.payload : recipe);
      })
      .addCase(removeRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
      });
  }
});

export const selectAllRecipes = (state: any) => state.recipes.recipes;

export const selectRecipeById = (state: any, recipeId: any) => {
  return state.recipes.recipes.find((recipe: any) => recipe.id === recipeId);
};

export const selectRecipeBySlug = (state: any, recipeSlug: string) => {
  return state.recipes.recipes.find((recipe: any) => recipe.slug === recipeSlug);
};

export default recipeSlice.reducer;
