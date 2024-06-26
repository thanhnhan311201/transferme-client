import React from 'react';
import { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { AiFillFileText } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import Button from '@mui/material/Button';

import { CacheFile } from '../../utils/cache-file';
import { formatFileSize } from '@/helpers/general.helper';

const BrowseFile: React.FC<{
	onHandleAllowToContinue: (isAllow: boolean) => void;
}> = (props) => {
	const [error, setError] = useState<string>('');
	const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			CacheFile.getInstance().file = null;
			props.onHandleAllowToContinue(false);
			setError('File does not upload!');
			setIsFileUploaded(false);
			return;
		}
		const file = e.target.files[0];
		if (file) {
			CacheFile.getInstance().file = file;
			setIsLoading(true);
		} else {
			CacheFile.getInstance().file = null;
			props.onHandleAllowToContinue(false);
			setError('The size of the file must be less than 1MB');
			setIsFileUploaded(false);
		}
	};

	const handleDeleteFile = () => {
		setIsFileUploaded(false);
		props.onHandleAllowToContinue(false);
		CacheFile.getInstance().file = null;
	};

	useEffect(() => {
		if (!CacheFile.getInstance().file) {
			setError('File does not upload!');
			setIsFileUploaded(false);
			props.onHandleAllowToContinue(false);
			return;
		}

		setIsLoading(false);
		setError('');
		setIsFileUploaded(true);
		props.onHandleAllowToContinue(true);
	}, [CacheFile.getInstance().file]);

	return (
		<>
			<Box
				sx={{
					border: '5px dashed #ebebeb',
					borderRadius: '14px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '3rem',
					maxHeight: '13rem',
				}}
			>
				<AnimatePresence>
					{!isFileUploaded && !CacheFile.getInstance().file && !isLoading && (
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
							className="flex flex-col items-center justify-center py-4"
						>
							<Box
								sx={{
									marginBottom: '15px',
									color: '#1f1f1f',
								}}
							>
								<span>Browse file</span>
							</Box>
							<Button
								sx={{
									padding: 0,
									borderRadius: '0.5rem',
									fontWeight: 400,
									textTransform: 'none',
									fontSize: '1rem',
								}}
							>
								<input
									type="file"
									name="transfer-file"
									id="transfer-file"
									className="hidden"
									onChange={handleUploadFile}
									value=""
								/>
								<label htmlFor="transfer-file">
									<div className="cursor-pointer rounded-lg bg-white px-4 py-2 text-1f1f1f shadow-btn hover:shadow-user-nav">
										<div className="flex items-center gap-2">
											<IconContext.Provider
												value={{
													style: {
														color: '1f1f1f',
														width: '1rem',
														height: '1rem',
													},
												}}
											>
												<AiFillFileText />
											</IconContext.Provider>
											<span className="text-base text-1f1f1f">Browse File</span>
										</div>
									</div>
								</label>
							</Button>
						</motion.div>
					)}
					{!isFileUploaded && !CacheFile.getInstance().file && isLoading && (
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
						>
							<CircularProgress />
						</motion.div>
					)}
					{isFileUploaded && CacheFile.getInstance().file && !isLoading && (
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
						>
							<Box
								sx={{
									padding: '1rem',
									borderRadius: '0.5rem',
									backgroundColor: '#ebebeb',
									color: '#1f1f1f',
									border: `2px solid ${error ? 'red' : '#fff'}`,
								}}
							>
								<Box
									sx={{
										width: '10rem',
										display: 'flex',
										flexDirection: 'column',
										gap: '0.75rem',
									}}
								>
									<span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal">
										{CacheFile.getInstance().file!.name}
									</span>
									<span className="text-sm font-normal text-0000008a">
										{formatFileSize(CacheFile.getInstance().file!.size)}
									</span>
								</Box>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'flex-end',
										cursor: 'pointer',
									}}
									onClick={handleDeleteFile}
								>
									<Box
										sx={{
											padding: '0.5rem',
											borderRadius: '50%',
											'&:hover': {
												backgroundColor: '#fff',
											},
										}}
									>
										<IconContext.Provider
											value={{
												style: {
													width: '1rem',
													height: '1rem',
												},
											}}
										>
											<FaTrashAlt />
										</IconContext.Provider>
									</Box>
								</Box>
							</Box>
						</motion.div>
					)}
				</AnimatePresence>
			</Box>
		</>
	);
};

export default BrowseFile;
