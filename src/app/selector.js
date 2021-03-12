import { createSelector } from '@reduxjs/toolkit';
export const selectValue = (state) => state.app.joke;
export const selecttorValue = createSelector(selectValue, (joke) => joke);