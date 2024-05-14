import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import productReducer from '../features/Menu-list/MenuSlice';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';
export const store = configureStore({
  reducer: {
    // counter: counterReducer,
     product:productReducer,
     cart:cartReducer,
     auth:authReducer,
  },
});
