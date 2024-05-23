import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/store';
import socketClient from '@/socket';
import {
	setUnauthenticated,
	authenticating,
	setAuthenticated,
} from '../controller/auth.slice';
import { availableToTransfer } from '@/modules/transfer/controller/transfer.slice';
import AuthAPI from '../controller/auth.service';

import { removeCredentialToken } from '../utils';
import { accessTokenStorage } from '@/utils/JWTStorage';
import { toast } from 'react-toastify';

const useAutoSignin = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	return useCallback(async () => {
		try {
			dispatch(authenticating());
			const accessToken = accessTokenStorage.get();
			if (accessToken) {
				const response = await AuthAPI.verifyToken();
				if (!response || response.status === 'error') {
					dispatch(setUnauthenticated());
					removeCredentialToken();
					return;
				}

				dispatch(setAuthenticated());
				dispatch(availableToTransfer());
				socketClient.connect({
					token: accessToken,
				});
				navigate('/transfer');
			} else {
				dispatch(setUnauthenticated());
				removeCredentialToken();
			}
		} catch (error: any) {
			toast.error(error.message);
			dispatch(setUnauthenticated());
			removeCredentialToken();
		}
	}, [dispatch, navigate]);
};

export default useAutoSignin;
