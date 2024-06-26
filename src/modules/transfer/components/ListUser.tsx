import React from 'react';
import { IconContext } from 'react-icons';

import { motion, AnimatePresence } from 'framer-motion';

import { BsCircleFill } from 'react-icons/bs';

const ListUser: React.FC<{
	onlineDevices: {
		id: string;
		clientId: string;
		profilePhoto: string;
		username: string;
		email: string;
	}[];
}> = (props) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: 100 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.75 }}
			className="overflow-hidden p-4 pt-0"
		>
			<div className="w-full rounded-xl p-4">
				<div className="flex w-full flex-col gap-3">
					<span className="text-lg font-medium text-3c4043">Devices</span>
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
								<ul className="flex flex-col gap-2">
									{props.onlineDevices.map((device) => (
										<motion.li
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.5 }}
											key={device.clientId}
										>
											<div className="flex items-center gap-3">
												<div className="relative w-6">
													<img
														className="z-0 w-full rounded-full"
														src={device.profilePhoto}
														alt="User avatar"
														referrerPolicy="no-referrer"
														crossOrigin="anonymous"
													/>
													<IconContext.Provider
														value={{
															style: {
																position: 'absolute',
																width: '0.75rem',
																height: '0.75rem',
																color: '#46ab5e',
																bottom: -2,
																right: -2,
																zIndex: 2,
																border: '2px solid #fff',
																borderRadius: '50%',
															},
														}}
													>
														<BsCircleFill />
													</IconContext.Provider>
												</div>
												<div className="truncate py-2 text-sm font-medium text-3c4043">
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
		</motion.div>
	);
};

export default ListUser;
