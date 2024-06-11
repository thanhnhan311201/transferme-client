import { createSlice } from '@reduxjs/toolkit';

interface SearchSliceState {
	isOpenSearchDialog: boolean;
}

const SLICE_NAME = 'search';

const initialState: SearchSliceState = {
	isOpenSearchDialog: false,
};

const searchSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		openSearchDialog: (state) => ({
			...state,
			isOpenSearchDialog: true,
		}),
		closeSearchDialog: (state) => ({
			...state,
			isOpenSearchDialog: false,
		}),
	},
});

export const { closeSearchDialog, openSearchDialog } = searchSlice.actions;

const searchReducer = searchSlice.reducer;
export default searchReducer;
