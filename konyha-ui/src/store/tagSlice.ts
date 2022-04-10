import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTags } from '../utils/api';
import { Tag, TagState } from '../utils/types';

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  return await getTags();
})

const initialState: TagState = {
  tags: [],
  status: 'idle',
  error: '',
};

export const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTags.pending, (state, _action) => {
        state.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  }
});

export const selectAllTags = (state: {tags: TagState}): Tag[] => state.tags.tags;

export const selectTagsByIds = (state: {tags: TagState}, tagIds: string[]): Tag[] => {
  return state.tags.tags.filter((tag: Tag) => tagIds.includes(tag.id));
};

export default tagSlice.reducer;
