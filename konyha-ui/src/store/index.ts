import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './recipeSlice';
import tagReducer from './tagSlice';

const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    tags: tagReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
