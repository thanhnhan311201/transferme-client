import React from 'react';
import { useState, useMemo, useEffect } from 'react';

import { motion } from 'framer-motion';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';

import BrowseFile from './BrowseFile';
import UserOption from './UserOption';
import FileTransfer from './FileTransfer';
import TransferError from './TransferError';

import { availableToTransfer } from '../../state/transfer.slice';
import { useAppDispatch, useAppSelector } from '@/store';
import { GatewayService } from '@/modules/gateway/gateway.service';

import { CacheFile } from '../../utils/cache-file';
import { Receiver } from '../../utils/receiver-instance';

import { TRANSFERRING_STATUS } from '../../types/transferring-status.type';

const steps = [
	'Choose file to transfer',
	'Choose device to transfer',
	'Transfer file',
];

const FileTransferStepper: React.FC = () => {
	const { transferStatus } = useAppSelector((state) => state.transfer);
	const { onlineDevices } = useAppSelector((state) => state.socket);

	const [activeStep, setActiveStep] = React.useState(0);
	const [isNext, setIsNext] = useState(false);
	const [isStartTransfer, setIsStartTransfer] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => {
			return prevActiveStep + 1;
		});
	};

	const handleTransferFile = () => {
		setIsStartTransfer(true);
		GatewayService.getInstance().requestSendFile(
			Receiver.getInstance().receiver,
		);
	};

	const handleCancelTransfer = () => {
		setIsStartTransfer(false);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => {
			return prevActiveStep - 1;
		});
	};

	useEffect(() => {
		if (transferStatus === TRANSFERRING_STATUS.AVAILABLE) {
			CacheFile.getInstance().file = null;
			Receiver.getInstance().receiver = '';
			setActiveStep(0);
			setIsNext(false);
			setIsStartTransfer(false);
			GatewayService.getInstance().transferStatus =
				TRANSFERRING_STATUS.AVAILABLE;
		} else if (transferStatus === TRANSFERRING_STATUS.REFUSE_REQUEST) {
			handleNext();
		}
	}, [transferStatus]);

	const handleAllowToContinue = (isAllow: boolean) => {
		setIsNext(isAllow);
	};

	const stepContent: React.ReactElement[] = useMemo(() => {
		return [
			<BrowseFile
				key="browse-file"
				onHandleAllowToContinue={handleAllowToContinue}
			/>,
			<UserOption
				key="user-option"
				onHandleAllowToContinue={handleAllowToContinue}
				onlineDevices={onlineDevices}
			/>,
			<FileTransfer
				key="file-transfer"
				isStartTransfer={isStartTransfer}
				onCancelTransfer={handleCancelTransfer}
			/>,
		];
	}, [isStartTransfer, onlineDevices]);

	useEffect(() => {
		CacheFile.getInstance().file = null;
		Receiver.getInstance().receiver = '';
	}, []);

	return (
		<Box
			sx={{
				width: '100%',
			}}
		>
			<Box sx={{ width: '100%' }}>
				<Stepper activeStep={activeStep} orientation="vertical">
					{steps.map((step) => (
						<Step key={step}>
							<StepLabel>{step}</StepLabel>
							<StepContent>
								<Box
									sx={{
										margin: '36px 0',
									}}
								>
									<motion.div
										key="step_item"
										className="mb-8"
										initial={{ opacity: 0, y: 50 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.25 }}
									>
										{stepContent[activeStep]}
									</motion.div>
									{!isStartTransfer && (
										<motion.div
											key="step_transfer"
											initial={{ opacity: 0, y: 50 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.25, delay: 0.25 }}
											className="flex flex-row"
										>
											<Button
												color="inherit"
												disabled={activeStep === 0}
												onClick={handleBack}
												sx={{
													mr: 1,
													width: '25%',
													marginRight: '1rem',
													borderRadius: '8px',
													'&:hover': {
														backgroundColor: '#fff',
														boxShadow:
															'0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
													},
												}}
											>
												Back
											</Button>
											{activeStep < steps.length - 1 ? (
												<Button
													disabled={!isNext}
													sx={{
														width: '75%',
														padding: '8px',
														backgroundColor: '#fff',
														boxShadow:
															'0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
														borderRadius: '8px',
														'&:hover': {
															backgroundColor: '#1976d2',
															color: '#fff',
														},
													}}
													onClick={handleNext}
												>
													Next
												</Button>
											) : (
												<Button
													sx={{
														width: '75%',
														padding: '8px',
														backgroundColor: '#fff',
														boxShadow:
															'0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
														borderRadius: '8px',
														'&:hover': {
															backgroundColor: '#1976d2',
															color: '#fff',
														},
													}}
													onClick={handleTransferFile}
												>
													Transfer
												</Button>
											)}
										</motion.div>
									)}
								</Box>
							</StepContent>
						</Step>
					))}
				</Stepper>
			</Box>
			{transferStatus === TRANSFERRING_STATUS.REFUSE_REQUEST && (
				<Box sx={{ width: '75%' }}>
					<TransferError
						onHandleReset={() => dispatch(availableToTransfer())}
					/>
				</Box>
			)}
		</Box>
	);
};

export default FileTransferStepper;
