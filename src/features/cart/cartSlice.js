import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCartItem, addItem, updateItem, deleteItem } from './cartAPI'; // Corrected import for deleteItem

const initialState = {
  items: [],
  status: 'idle',
};

export const fetchCartItemAsync = createAsyncThunk(
  'cart/fetchCartItem',
  async () => {
    const response = await fetchCartItem();
    return response.data;
  }
);

export const addItemAsync = createAsyncThunk(
  'cart/addItem',
  async (item) => {
    const newitem={...item,quantity:1}
    const response = await addItem(newitem);
    return response.data;
  }
);

export const updateItemAsync = createAsyncThunk(
  'cart/updateItem',
  async (item) => { 
    const response = await updateItem(item.id, item);
    return response.data;
  }
);

export const deleteItemAsync = createAsyncThunk(
  'cart/deleteItem',
  async (id) => {
   await deleteItem(id);
    return  id;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(addItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex((item)=>item.id===action.payload.id);
        state.items[index]=action.payload;
      })
      .addCase(deleteItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload);
        if (index !== -1) {
          state.items.splice(index, 1);
        }
      });
      
  },
});

export const cartItem = (state) => state.cart.items;

export default cartSlice.reducer;
