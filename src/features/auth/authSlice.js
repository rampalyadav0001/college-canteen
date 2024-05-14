import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, checkUser, signOutUser } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error: null,
};

export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (items) => {
    const response = await createUser(items);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  'cart/checkUser',
  async (item) => {
    const response = await checkUser(item);
    return response.data;
  }
);
export const signOutUserAsync = createAsyncThunk(
  'cart/signOutUser',
  async (userId) => {
    const response = await signOutUser(userId);
    return response.data;
  }
);


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(signOutUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      })
  },
});

export const selectloggedInUser = (state) => state.auth.loggedInUser;
export const usererror=(state)=>state.auth.error;
export default authSlice.reducer;
