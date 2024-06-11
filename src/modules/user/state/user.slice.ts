import { createSlice } from '@reduxjs/toolkit';

import type { User } from '../@types';

interface UserSliceState {
	userInfo: User | null;
	isOpenUserSettingDialog: boolean;
}

const SLICE_NAME = 'user';

const initialState: UserSliceState = {
	userInfo: null,
	isOpenUserSettingDialog: false,
};

const userSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		setUser: (
			state,
			action: {
				payload: User;
				type: string;
			},
		) => ({
			...state,
			userInfo: action.payload,
		}),
		removeUser: (state) => ({
			...state,
			userInfo: null,
		}),
		openUserSettingDialog: (state) => ({
			...state,
			isOpenUserSettingDialog: true,
		}),
		closeUserSettingDialog: (state) => ({
			...state,
			isOpenUserSettingDialog: false,
		}),
	},
});

export const {
	removeUser,
	setUser,
	closeUserSettingDialog,
	openUserSettingDialog,
} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
