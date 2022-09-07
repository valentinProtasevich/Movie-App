import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: 'rus',
};

const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    changeLanguage(state, action) {
      state.language = action.payload.language;
    }
  }
});

export const {changeLanguage} = languagesSlice.actions;

export default languagesSlice.reducer;