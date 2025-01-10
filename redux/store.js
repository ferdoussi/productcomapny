import { configureStore } from '@reduxjs/toolkit';
import clientReducer from '../redux/clientSlice';
import productReducer from '../redux/productSlice';

export const store = configureStore({
  reducer: {
    client: clientReducer,
    product: productReducer,
  },
});
 