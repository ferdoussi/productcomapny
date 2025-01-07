import { configureStore } from '@reduxjs/toolkit';
import clientReducer from '../redux/clientSlice';

export const store = configureStore({
  reducer: {
    client: clientReducer,
  },
});
 