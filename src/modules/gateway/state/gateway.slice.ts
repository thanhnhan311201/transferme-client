import { createSlice } from '@reduxjs/toolkit';

import type { User } from '@/modules/user/@types';

interface SocketSliceState {
	onlineDevices: (User & { clientId: string })[];
}

const initialState: SocketSliceState = {
	onlineDevices: [],
};

const socketSlice = createSlice({
	name: 'socket',
	initialState,
	reducers: {
		setDevices: (state, action) => ({
			...state,
			onlineDevices: action.payload,
		}),
		addDevice: (state, action) => ({
			...state,
			onlineDevices: state.onlineDevices.concat(action.payload),
		}),
		removeDevice: (state, action) => {
			const remainingDevices = state.onlineDevices.filter(
				(device) => device.clientId !== action.payload,
			);
			return {
				...state,
				onlineDevices: remainingDevices,
			};
		},
	},
});

export const { addDevice, removeDevice, setDevices } = socketSlice.actions;

const socketReducer = socketSlice.reducer;
export default socketReducer;
