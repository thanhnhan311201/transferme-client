import React from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { MdLogout, MdOutlineDevices } from 'react-icons/md';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { BsCircleFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';

import type { User } from '@/modules/user/@types';

const UserNav = React.forwardRef<
	HTMLDivElement,
	{
		onLogout: () => void;
		userInfo: User | null;
		clientId: string | null;
		onlineDevices: (User & { clientId: string })[];
	}
>((props, ref) => {
	return (
		<motion.div
			key="user_nav"
			ref={ref}
			initial={{ opacity: 0, x: 125, y: -100, scale: 0 }}
			animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
			exit={{ opacity: 0, x: 125, y: -100, scale: 0 }}
			className="absolute right-4 top-16 z-50 w-88 rounded-3xl bg-modal-user p-2 shadow-user-nav"
		>
			<div className="mb-2 w-full rounded-3xl bg-white p-4">
				<div className="flex items-center gap-4">
					<div className="w-14">
						<img
							className="w-full rounded-full"
							src={props.userInfo?.profilePhoto}
							alt="User avatar"
							referrerPolicy="no-referrer"
							crossOrigin="anonymous"
						/>
					</div>
					<div className="grow">
						<div className="text-sm font-medium text-3c4043">
							{props.userInfo?.username}
						</div>
						<div className="truncate text-xs text-5f6368">
							{props.userInfo?.email}
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-1">
				<div className="flex flex-col border-b border-solid border-gray-200">
					<div className="flex w-full items-center gap-4 px-4 py-2">
						<div className="flex w-14 justify-center">
							<IconContext.Provider
								value={{
									style: {
										width: '1.5rem',
										height: '1.5rem',
									},
								}}
							>
								<HiOutlineStatusOnline />
							</IconContext.Provider>
						</div>
						<div className="grow">
							<span className="text-base font-medium text-46ab5e">
								{props.clientId}
							</span>
						</div>
					</div>
					<div className="flex w-full items-center gap-4 p-4 py-2">
						<div className="flex w-14 justify-center self-start">
							<IconContext.Provider
								value={{
									style: {
										width: '1.5rem',
										height: '1.5rem',
									},
								}}
							>
								<MdOutlineDevices />
							</IconContext.Provider>
						</div>
						<div className="flex grow flex-col gap-1">
							<span className="text-base font-medium text-3c4043">
								Online Devices
							</span>
							<div>
								<AnimatePresence>
									{props.onlineDevices.length === 0 ? (
										<motion.p
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.5 }}
											className="text-sm"
										>
											No device found
										</motion.p>
									) : (
										<ul className="flex flex-col">
											{props.onlineDevices.map((device) => (
												<motion.li
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													exit={{ opacity: 0 }}
													transition={{ duration: 0.5 }}
													key={device.id}
												>
													<div className="flex items-center gap-3">
														<IconContext.Provider
															value={{
																style: {
																	width: '.75rem',
																	height: '.75rem',
																	color: '#46ab5e',
																	borderRadius: '50%',
																},
															}}
														>
															<BsCircleFill />
														</IconContext.Provider>
														<div className="grow truncate py-1 text-sm font-normal text-3c4043">
															<span>{device.clientId}</span>
														</div>
													</div>
												</motion.li>
											))}
										</ul>
									)}
								</AnimatePresence>
							</div>
						</div>
					</div>
				</div>
				<div
					onClick={props.onLogout}
					className="flex w-full cursor-pointer items-center gap-4 rounded-3xl p-4 hover:bg-e0e9f8"
				>
					<div className="flex w-14 justify-center">
						<IconContext.Provider
							value={{
								style: {
									width: '1.5rem',
									height: '1.5rem',
								},
							}}
						>
							<MdLogout />
						</IconContext.Provider>
					</div>
					<div className="grow">
						<span className="text-base font-medium text-3c4043">Log out</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
});

UserNav.displayName = 'UserNav';
export default UserNav;
