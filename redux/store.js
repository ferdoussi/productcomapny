import { configureStore } from '@reduxjs/toolkit';
import clientReducer from '../redux/clientSlice';
import productReducer from '../redux/productSlice';
import counterReducer from '../redux/counterSlice';
export const store = configureStore({
  reducer: {
    client: clientReducer,
    product: productReducer,
    counter: counterReducer,
  },
});
 