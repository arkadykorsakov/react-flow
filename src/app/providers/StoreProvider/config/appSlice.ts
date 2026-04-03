import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  initialized: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

export const appReducer = appSlice.reducer;
