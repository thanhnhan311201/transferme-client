import { createSlice } from '@reduxjs/toolkit';

import { TRANSFERRING_STATUS } from '../types/transferring-status.type';

interface ITransferSliceState {
	transferStatus: TRANSFERRING_STATUS;
	sender: string;
	progress: number;
}

const initialState: ITransferSliceState = {
	transferStatus: TRANSFERRING_STATUS.AVAILABLE,
	progress: 0,
	sender: '',
};

const transferSlice = createSlice({
	name: 'transfer',
	initialState,
	reducers: {
		transferSuccess: (state) => ({
			...state,
			transferStatus: TRANSFERRING_STATUS.TRANSFER_SUCCESS,
		}),
		transferError: (state) => ({
			...state,
			transferStatus: TRANSFERRING_STATUS.TRANSFER_FAILED,
		}),
		waitForAccept: (state, action) => ({
			...state,
			transferStatus: TRANSFERRING_STATUS.WAIT_TRANSFER_ACCEPTED,
			sender: action.payload,
		}),
		availableToTransfer: (state) => ({
			...state,
			transferStatus: TRANSFERRING_STATUS.AVAILABLE,
			sender: '',
			progress: 0,
		}),
		transfering: (state) => ({
			...state,
			transferStatus: TRANSFERRING_STATUS.TRANSFERING,
		}),
		waitForRecipientReceiveFile: (state) => ({
			...state,
			transferStatus: TRANSFERRING_STATUS.WAIT_FOR_RECIPIENT_RECEIVE_FILE,
		}),
		refuseTransfer: (state) => ({
			...state,
			transferStatus: TRANSFERRING_STATUS.REFUSE_REQUEST,
		}),
		setProgress: (state, action) => {
			return { ...state, progress: action.payload * 100 };
		},
	},
});

export const {
	availableToTransfer,
	refuseTransfer,
	setProgress,
	transferError,
	transferSuccess,
	transfering,
	waitForAccept,
	waitForRecipientReceiveFile,
} = transferSlice.actions;

const transferReducer = transferSlice.reducer;
export default transferReducer;
