import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser, getUser } from '../utils/api';
import { User, UserState, LoginData } from '../utils/types';

export const sendLogin = createAsyncThunk('user/sendLogin', async (loginData: LoginData) => {
  return await loginUser(loginData);
});

export const fetchUser = createAsyncThunk('user/fetchUser', async (userId: string) => {
  return await getUser(userId);
});

const initialState: UserState = {
  user: {
    id: localStorage.getItem('userId') ?? '',
    email: '',
  },
  loggedIn: false,
  status: 'idle',
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = {
        id: '',
        email: '',
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendLogin.pending, (state, _action) => {
        state.status = 'loading';
      })
      .addCase(sendLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(sendLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      })
      .addCase(fetchUser.pending, (state, _action) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  }
});

export const selectUser = (state: {user: UserState}): User | undefined => state.user.user;
export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
