import { useCallback } from 'react';

import { toast } from 'react-toastify';

import { useAppDispatch } from '@/store';
import { WebSocketClient } from '@/network/websocket';
import { AccessTokenStorage } from '@/storage/jwt-storage';
import {
	setUnauthenticated,
	authenticating,
	setAuthenticated,
} from '../state/auth.slice';
import { AuthService } from '../services';
import { removeUser } from '@/modules/user/state/user.slice';

import { removeCredentialToken } from '../helpers';

const useAutoSignin = () => {
	const dispatch = useAppDispatch();

	return useCallback(async () => {
		try {
			dispatch(authenticating());
			const accessToken = AccessTokenStorage.getInstance().get();
			if (accessToken) {
				const response = await AuthService.getInstance().verifyToken();
				if (!response || response.status === 'error') {
					dispatch(setUnauthenticated());
					removeCredentialToken();
					return;
				}

				dispatch(setAuthenticated());
				WebSocketClient.getInstance().connect(accessToken);
			} else {
				dispatch(setUnauthenticated());
				dispatch(removeUser());
				removeCredentialToken();
			}
		} catch (error: any) {
			toast.error(error.message);
			dispatch(setUnauthenticated());
			dispatch(removeUser());
			removeCredentialToken();
		}
	}, [dispatch]);
};

export default useAutoSignin;
