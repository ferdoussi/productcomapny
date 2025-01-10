import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
  },
  reducers: {
    setProduits: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProduits } = productSlice.actions;
export default productSlice.reducer;
