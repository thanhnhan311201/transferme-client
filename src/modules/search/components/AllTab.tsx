import React from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import { IconContext } from 'react-icons';
import { BsCircleFill } from 'react-icons/bs';

const AllTab: React.FC<{
	userList: {
		id: number;
		avatar: string;
		name: string;
		isOnline: boolean;
	}[];
}> = ({ userList }) => {
	return (
		<motion.div
			key="all-tab"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="flex h-full w-full flex-col justify-start"
		>
			<div className="flex max-h-full shrink-0 basis-2/4 flex-col justify-start">
				<div className="flex shrink-0 items-center gap-4 py-3">
					<div className='text-main-text-color font-["Inter"] text-lg font-semibold'>
						Users
					</div>
					<div className='text-grey/75 font-["Inter"] text-xs font-medium'>
						6
					</div>
				</div>
				<div className="user-list -mx-5 flex grow flex-col justify-start overflow-y-auto scroll-smooth">
					{userList.map((user) => (
						<Link
							key={user.id}
							className="hover:bg-search-dialog__btn-hover-color group relative flex items-center gap-5 rounded-xl bg-transparent py-5 pl-5 pr-24 transition-colors"
							to="/"
						>
							<div className="relative h-12 shrink-0 basis-12">
								<img
									className="w-full rounded-full"
									src={user.avatar}
									alt="User avatar"
									referrerPolicy="no-referrer"
									crossOrigin="anonymous"
								/>
								{user.isOnline && (
									<IconContext.Provider
										value={{
											style: {
												position: 'absolute',
												width: '1.125rem',
												height: '1.125rem',
												color: '#46ab5e',
												bottom: -2,
												right: -2,
												border: '4px solid transparent',
												borderRadius: '50%',
											},
										}}
									>
										<BsCircleFill />
									</IconContext.Provider>
								)}
							</div>
							<div className="text-main-text-color grow truncate text-left font-['Inter'] text-base font-semibold">
								{user.name}
							</div>
						</Link>
					))}
				</div>
			</div>
			<div className="flex shrink-0 basis-2/4 flex-col justify-start">
				<div className="flex items-center gap-4 py-3">
					<div className='text-main-text-color font-["Inter"] text-lg font-semibold'>
						Files
					</div>
					<div className='text-grey/75 font-["Inter"] text-xs font-medium'>
						20
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default AllTab;
