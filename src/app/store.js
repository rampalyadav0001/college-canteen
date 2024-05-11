import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import productReducer from '../features/Menu-list/MenuSlice';
export const store = configureStore({
  reducer: {
    // counter: counterReducer,
     product:productReducer,
  },
});
