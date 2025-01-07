import { createSlice } from '@reduxjs/toolkit';

const clientSlice = createSlice({
  name: 'client',
  initialState: {
    clientID: null,
  },
  reducers: {
    setClientID: (state, action) => {
      state.clientID = action.payload;
    },
    clearClientID: (state) => {
      state.clientID = null;
    },
  },
});

export const { setClientID, clearClientID } = clientSlice.actions;
export default clientSlice.reducer;
