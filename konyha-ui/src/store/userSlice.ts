import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { getUser } from '../utils/api';
import { User, UserState } from '../utils/types';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  // return await getUser();
  return {id: 'a', email: 'b'};
})

const initialState: UserState = {
  user: undefined,
  loggedIn: false,
  status: 'idle',
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, _action) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload ?? undefined;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  }
});

export const selectUser = (state: {user: UserState}): User | undefined | void => state.user.user;

export default userSlice.reducer;
