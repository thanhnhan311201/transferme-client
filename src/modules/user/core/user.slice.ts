import { createSlice } from '@reduxjs/toolkit';

export interface IUserInfo {
	id: string;
	email: string;
	username: string;
	profilePhoto: string;
}

interface UserSliceState {
	userInfo: IUserInfo | null;
	isOpenUserSetting: boolean;
}

const SLICE_NAME = 'user';

const initialState: UserSliceState = {
	userInfo: null,
	isOpenUserSetting: false,
};

const userSlice = createSlice({
	name: SLICE_NAME,
	initialState: initialState,
	reducers: {
		setUser: (
			state,
			action: {
				payload: IUserInfo;
				type: string;
			}
		) => ({
			...state,
			userInfo: action.payload,
		}),
		removeUser: (state) => ({
			...state,
			userInfo: null,
		}),
		openUserSetting: (state) => ({
			...state,
			isOpenUserSetting: true,
		}),
		closeUserSetting: (state) => ({
			...state,
			isOpenUserSetting: false,
		}),
	},
});

export const { removeUser, setUser, closeUserSetting, openUserSetting } =
	userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
