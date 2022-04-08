import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './recipeSlice';

const store = configureStore({
  reducer: {
    recipes: recipeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
