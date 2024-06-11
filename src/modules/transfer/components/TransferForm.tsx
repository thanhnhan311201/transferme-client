import React from 'react';

import { motion } from 'framer-motion';

import FileTransferStepper from './Stepper';

const TransferForm: React.FC = () => {
	return (
		<div className="mx-auto my-0 mt-8 w-full max-w-3xl pb-4">
			<div className="h-full w-full rounded-xl bg-transparent">
				<motion.div
					initial={{ opacity: 0, x: -100 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.75 }}
					className="flex flex-col items-center gap-4 px-8 py-4"
				>
					<span className="text-2xl font-medium text-1f1f1f">TransferMe</span>
					<span className="text-base font-normal text-777">
						Transfer and take your files to infinity and beyond
					</span>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.75 }}
					className="w-full px-8 pt-6"
				>
					<FileTransferStepper />
				</motion.div>
			</div>
		</div>
	);
};

export default TransferForm;
