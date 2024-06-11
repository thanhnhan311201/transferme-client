import React, { useCallback } from 'react';

import { useAppSelector, useAppDispatch } from '@/store';
import { closeNewTransferDialog } from '../state/transfer.slice';

import Dialog from '@/components/Dialog';

const NewTransferDialog: React.FC = () => {
	const { isOpenNewTransferDialog } = useAppSelector(
		(state) => state.transferV2,
	);
	const dispatch = useAppDispatch();

	const handleCloseNewTransferDialog = useCallback(() => {
		dispatch(closeNewTransferDialog());
	}, []);

	return (
		<Dialog
			isOpen={isOpenNewTransferDialog}
			onClose={handleCloseNewTransferDialog}
			isDisplayCloseBtn={true}
		>
			<div className="bg-modal h-[40rem] w-[40rem] rounded-3xl p-12">
				<div className="flex h-full w-full"></div>
			</div>
		</Dialog>
	);
};

export default NewTransferDialog;
