import { createSlice } from '@reduxjs/toolkit';

import { THEME_PROFILE } from '@/types/common.type';
import { THEME } from '@/utils/constants.util';

interface IThemeState {
	themeProfile: THEME_PROFILE;
}

const initialState: IThemeState = {
	themeProfile:
		(localStorage.getItem(THEME) as THEME_PROFILE) || THEME_PROFILE.DARK,
};

const themeSlice = createSlice({
	name: 'theme',
	initialState: initialState,
	reducers: {
		toggleLightTheme: (state) => {
			localStorage.setItem(THEME, THEME_PROFILE.LIGHT);

			return {
				...state,
				themeProfile: THEME_PROFILE.LIGHT,
			};
		},
		toggleDarkTheme: (state) => {
			localStorage.setItem(THEME, THEME_PROFILE.DARK);

			return {
				...state,
				themeProfile: THEME_PROFILE.DARK,
			};
		},
	},
});

export const { toggleDarkTheme, toggleLightTheme } = themeSlice.actions;

const themeReducer = themeSlice.reducer;
export default themeReducer;
