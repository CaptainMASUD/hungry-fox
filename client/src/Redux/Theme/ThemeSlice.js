// src/Redux/Theme/ThemeSlice.js

import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: 'light', // Default theme
  },
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'; // Toggle logic
    },
  },
});

export const { toggleTheme } = themeSlice.actions; // Ensure toggleTheme is exported
export default themeSlice.reducer; // Ensure the reducer is exported
