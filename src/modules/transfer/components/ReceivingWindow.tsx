import React from 'react';
import ReactDOM from 'react-dom';

import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';

import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { BiTransferAlt } from 'react-icons/bi';
import { IconContext } from 'react-icons';

import {
	transferError,
	availableToTransfer,
	transfering,
} from '../state/transfer.slice';
import { GatewayService } from '@/modules/gateway/gateway.service';
import { useAppDispatch, useAppSelector } from '@/store';

import TransferProgressWithLabel from './Stepper/TransferProgress';

import { TRANSFERRING_STATUS } from '../types/transferring-status.type';
import transferFiles from '@public/lotties/transfer-files.json';

const ReceivingWindow: React.FC = () => {
	const { transferStatus, sender, progress } = useAppSelector(
		(state) => state.transfer,
	);

	const dispatch = useAppDispatch();

	const handleRefuse = () => {
		GatewayService.getInstance().replyToRequest(false);
	};

	const handleCancel = () => {
		GatewayService.getInstance().cancelTransfer();
		dispatch(transferError());
	};

	const handleReset = () => {
		dispatch(availableToTransfer());
	};

	const handleAccept = () => {
		dispatch(transfering());
		GatewayService.getInstance().replyToRequest(true);
	};

	return (
		<>
			{ReactDOM.createPortal(
				<Box>
					<Backdrop
						sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
						open={transferStatus !== TRANSFERRING_STATUS.AVAILABLE}
					>
						<motion.div
							key="receiving_window"
							initial={{ opacity: 0, y: -150 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -150 }}
							transition={{ duration: 0.5 }}
							className="z-50 w-50rem rounded-3xl bg-gradient-to-r from-primary-color--tint-5 to-primary-color py-4 pl-8 pr-16 shadow-xl"
						>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '2rem',
									color: '#fff',
								}}
							>
								<Player
									autoplay
									loop
									speed={1.5}
									src={transferFiles}
									style={{ height: '300px', width: 'auto' }}
								/>
								{transferStatus ===
									TRANSFERRING_STATUS.WAIT_TRANSFER_ACCEPTED && (
									<motion.div
										key="transfer_request"
										initial={{ opacity: 0, x: 50 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -50 }}
										transition={{ duration: 0.5 }}
										className="flex flex-1 flex-col"
									>
										<h2 className="mb-2 text-2xl font-medium">
											Hey, You Just Received A File Transfer Request!
										</h2>
										<span className="mb-10 text-base font-normal">
											Do you want to receive files from the{' '}
											<strong>{sender}?</strong>
										</span>
										<Box
											sx={{
												display: 'flex',
												gap: '1rem',
												alignItems: 'center',
												fontSize: '.875rem',
											}}
										>
											<Button
												sx={{
													width: '50%',
													padding: '6px 8px',
													backgroundColor: 'transparent',
													borderRadius: '8px',
													border: '2px solid #fff',
													color: '#fff',
													textTransform: 'none',
													'&:hover': {
														backgroundColor: '#fff',
														color: '#1565c0',
													},
												}}
												onClick={handleRefuse}
											>
												No, I dont want it
											</Button>
											<Button
												sx={{
													width: '50%',
													padding: '6px 8px',
													backgroundColor: '#fff',
													borderRadius: '8px',
													border: '2px solid #fff',
													color: '#1565c0',
													textTransform: 'none',
													'&:hover': {
														bachkgroundColor: 'transparent',
														color: '#fff',
													},
												}}
												onClick={handleAccept}
											>
												Yes, Send it to me
											</Button>
										</Box>
									</motion.div>
								)}
								{transferStatus === TRANSFERRING_STATUS.TRANSFERING && (
									<motion.div
										key="transfer_progress"
										initial={{ opacity: 0, x: 50 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -50 }}
										transition={{ duration: 0.5 }}
										className="flex flex-1 flex-col"
									>
										<h2 className="mb-8 text-2xl font-medium">
											Transfering...
										</h2>
										<Box
											sx={{
												marginBottom: '3rem',
											}}
										>
											<TransferProgressWithLabel value={progress} />
										</Box>
										<Button
											sx={{
												width: '100%',
												padding: '6px 8px',
												backgroundColor: 'transparent',
												borderRadius: '8px',
												color: '#999',
												textTransform: 'none',
												'&:hover': {
													backgroundColor: '#fff',
													color: '#b91c1c',
												},
											}}
											onClick={handleCancel}
										>
											Cancel
										</Button>
									</motion.div>
								)}
								{transferStatus ===
									TRANSFERRING_STATUS.WAIT_FOR_RECIPIENT_RECEIVE_FILE && (
									<motion.div
										key="waiting_for_success"
										initial={{ opacity: 0, x: 50 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -50 }}
										transition={{ duration: 0.5 }}
										className="flex flex-1 flex-col"
									>
										<h2 className="mb-8 text-2xl font-medium">
											Waiting for the recipient to receive the file
											successfully...
										</h2>

										<Box
											sx={{
												marginBottom: '3rem',
											}}
										>
											<LinearProgress color="inherit" />
										</Box>
									</motion.div>
								)}
								{transferStatus === TRANSFERRING_STATUS.TRANSFER_SUCCESS && (
									<motion.div
										key="transfer_success"
										initial={{ opacity: 0, x: 50 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -50 }}
										transition={{ duration: 0.5 }}
										className="flex flex-1 flex-col"
									>
										<h2 className="mb-2 text-2xl font-medium">Successfully!</h2>
										<span className="mb-10 text-base font-normal">
											Your file has been transferred successfully!
										</span>
										<Button
											sx={{
												width: '100%',
												textAlign: 'center',
												backgroundColor: '#fff',
												color: '#1565c0',
												borderRadius: '8px',
												textTransform: 'none',
												border: '2px solid #fff',
												'&:hover': {
													bachkgroundColor: 'transparent',
													color: '#fff',
												},
												display: 'flex',
												gap: '1rem',
											}}
											onClick={handleReset}
										>
											<IconContext.Provider
												value={{
													style: {
														width: '1rem',
														height: '1rem',
													},
												}}
											>
												<BiTransferAlt />
											</IconContext.Provider>
											Finish
										</Button>
									</motion.div>
								)}
								{transferStatus === TRANSFERRING_STATUS.TRANSFER_FAILED && (
									<motion.div
										key="transfer_error"
										initial={{ opacity: 0, x: 50 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -50 }}
										transition={{ duration: 0.5 }}
										className="flex flex-1 flex-col"
									>
										<h2 className="mb-2 text-2xl font-medium">Error!</h2>
										<span className="mb-10 text-base font-normal">
											Your file has been transferred unsuccessfully!
										</span>
										<Button
											sx={{
												width: '100%',
												textAlign: 'center',
												backgroundColor: '#fff',
												color: '#1565c0',
												borderRadius: '8px',
												textTransform: 'none',
												border: '2px solid #fff',
												'&:hover': {
													bachkgroundColor: 'transparent',
													color: '#fff',
												},
												display: 'flex',
												gap: '1rem',
											}}
											onClick={handleReset}
										>
											<IconContext.Provider
												value={{
													style: {
														width: '1rem',
														height: '1rem',
													},
												}}
											>
												<BiTransferAlt />
											</IconContext.Provider>
											Finish
										</Button>
									</motion.div>
								)}
							</Box>
						</motion.div>
					</Backdrop>
				</Box>,
				document.getElementById('modal-root') as Element,
			)}
		</>
	);
};

export default ReceivingWindow;
