import React from 'react';
import { NavLink } from 'react-router-dom';

import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';

import { RiFileTransferFill } from 'react-icons/ri';
import { RiFileTransferLine } from 'react-icons/ri';

const featsNav: { key: string; content: string }[] = [
	{ key: 'transfer', content: 'Transfer file' },
	{ key: 'my-drive', content: 'My Drive' },
];
const activeNav: string = 'transfer';

const Navigation = () => {
	return (
		<motion.div
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.75 }}
			className="overflow-hidden"
		>
			<div className="w-full p-4">
				<div className="flex w-full flex-col">
					{featsNav.map((feat) => (
						<NavLink key={feat.key} to={`/${feat.key}`}>
							<div
								className={`flex cursor-pointer justify-start rounded-xl px-4 py-2 hover:bg-edf2fc ${
									activeNav === feat.key ? 'bg-e0e9f8' : 'bg-inherit'
								}`}
							>
								<div className="flex items-center gap-4 text-1f1f1f">
									<IconContext.Provider
										value={{
											style: {
												width: '1.25rem',
												height: '1.2 5rem',
												color: '1f1f1f',
											},
										}}
									>
										{activeNav === feat.key ? (
											<RiFileTransferFill />
										) : (
											<RiFileTransferLine />
										)}
									</IconContext.Provider>
									<span className="font-sm font-medium">{feat.content}</span>
								</div>
							</div>
						</NavLink>
					))}
				</div>
			</div>
		</motion.div>
	);
};

export default Navigation;
