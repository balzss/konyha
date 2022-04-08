import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getRecipes } from '../utils/api';
import { RecipeState } from '../utils/types';

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  return await getRecipes();
})

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
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  }
})


export const selectAllRecipes = (state: any) => state.recipes.recipes;

export const selectRecipeById = (state: any, recipeId: any) => {
  return state.recipes.recipes.find((recipe: any) => recipe.id === recipeId);
};

export default recipeSlice.reducer;
