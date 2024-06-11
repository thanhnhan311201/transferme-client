import React from 'react';
import { useState, useCallback } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '@/store';
import { useOutsideRef } from '@/modules/common/hooks';
import { GatewayService } from '@/modules/gateway/gateway.service';

import Header from '../components/Header';
import TransferForm from '../components/TransferForm';
import UserNav from '../components/UserNav';
import ReceivingWindow from '../components/ReceivingWindow';
import ListUser from '../components/ListUser';

import { TRANSFERRING_STATUS } from '../types/transferring-status.type';
import { AuthService } from '@/modules/auth/services';
import { removeCredentialToken } from '@/modules/auth/helpers';
import { setUnauthenticated } from '@/modules/auth/state/auth.slice';
import { removeUser } from '@/modules/user/state/user.slice';
import { CLIENT_ID } from '@/utils';

const Transfer: React.FC = () => {
	const { onlineDevices } = useAppSelector((state) => state.socket);
	const { userInfo } = useAppSelector((state) => state.user);
	const { transferStatus } = useAppSelector((state) => state.transfer);

	const clientId = localStorage.getItem(CLIENT_ID);

	const dispatch = useAppDispatch();

	const [showUserNav, setShowUserNav] = useState<boolean>(false);

	const [userNavRef, userHeaderRef] = useOutsideRef(() => {
		setShowUserNav(false);
	});

	const handleShowUserNav = useCallback(() => {
		setShowUserNav((prev) => !prev);
	}, []);

	const handleLogout = useCallback(async () => {
		await AuthService.getInstance().signout();
		removeCredentialToken();
		dispatch(setUnauthenticated());
		dispatch(removeUser());
		GatewayService.getInstance().disconnect();
	}, []);

	return (
		<div>
			<AnimatePresence>
				{transferStatus !== TRANSFERRING_STATUS.AVAILABLE &&
					transferStatus !== TRANSFERRING_STATUS.REFUSE_REQUEST && (
						<ReceivingWindow />
					)}
			</AnimatePresence>
			<div className="h-screen bg-fafafa">
				<div className="grid h-full grid-cols-3-for-transferLayout grid-rows-2-for-transferLayout">
					<motion.div
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.75 }}
						className="relative col-span-full mx-auto my-0 w-full max-w-7xl"
					>
						<Header
							ref={userHeaderRef}
							showUserNav={showUserNav}
							onHandleShowUserNav={handleShowUserNav}
							userInfo={userInfo}
							clientId={clientId}
						/>
						<AnimatePresence>
							{showUserNav && (
								<UserNav
									ref={userNavRef}
									key="modal"
									onLogout={handleLogout}
									userInfo={userInfo}
									clientId={clientId}
									onlineDevices={onlineDevices}
								/>
							)}
						</AnimatePresence>
					</motion.div>
					<ListUser onlineDevices={onlineDevices} />
					<TransferForm />
				</div>
			</div>
		</div>
	);
};

export default Transfer;
