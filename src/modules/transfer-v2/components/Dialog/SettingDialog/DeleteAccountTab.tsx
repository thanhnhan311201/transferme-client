import React from 'react';

import { motion } from 'framer-motion';

const DeleteAccountTab: React.FC = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="w-full h-full flex flex-col justify-start gap-8"
		>
			<div className="shrink-0 font-['Inter'] text-3xl font-bold tracking-tight text-main-text-color">
				{`We're so sorry to see you go`}
			</div>
			<div className="grow"></div>
		</motion.div>
	);
};

export default DeleteAccountTab;
