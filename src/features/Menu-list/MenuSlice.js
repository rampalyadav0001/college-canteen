import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchAllCategories } from './MenuAPI';

const initialState = {
  products: [],
  categories: [],
  status: 'idle',
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    try {
      const response = await fetchAllProducts();
      return response.data;
    } catch (error) {
      // Handle error, for example, log it or dispatch another action
      console.error('Error fetching all products:', error);
      throw error;
    }
  }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
  'product/fetchAllCategories',
  async () => {
    try {
      const response = await fetchAllCategories();
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {
    // Placeholder for potential future reducers
    // You can add other reducers here if needed
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      });
  },
});

// Export actions and selectors
// export const { increment, decrement, incrementByAmount } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectAllProductsByCategories = (state) => state.product.categories;

// Export the reducer
export default productSlice.reducer;
