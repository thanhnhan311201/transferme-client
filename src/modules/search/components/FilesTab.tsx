import React from 'react';

import { motion } from 'framer-motion';

const FilesTab: React.FC = () => {
	return (
		<motion.div
			key="files-tab"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="flex h-full w-full flex-col justify-start"
		>
			<div className="flex items-center gap-4 py-3">
				<div className='text-main-text-color font-["Inter"] text-lg font-semibold'>
					Files
				</div>
				<div className='text-grey/75 font-["Inter"] text-xs font-medium'>
					20
				</div>
			</div>
		</motion.div>
	);
};

export default FilesTab;
