import { createSlice } from '@reduxjs/toolkit';

interface TransferSliceState {
	isOpenNewTransferDialog: boolean;
}

const SLICE_NAME = 'transfer';

const initialState: TransferSliceState = {
	isOpenNewTransferDialog: false,
};

const transferSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		openNewTransferDialog: (state) => ({
			...state,
			isOpenNewTransferDialog: true,
		}),
		closeNewTransferDialog: (state) => ({
			...state,
			isOpenNewTransferDialog: false,
		}),
	},
});

export const { closeNewTransferDialog, openNewTransferDialog } =
	transferSlice.actions;

const transferReducer = transferSlice.reducer;
export default transferReducer;
