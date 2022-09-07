import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: 'ru',
};

const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload.language;
    }
  }
});

export const {setLanguage} = languagesSlice.actions;

export default languagesSlice.reducer;