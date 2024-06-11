import React from 'react';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

import { useAppDispatch } from '@/store';
import { availableToTransfer } from '@/modules/transfer/state/transfer.slice';
import { useInput, ValidationType } from '@/modules/common/hooks';
import { setAuthenticated } from '../state/auth.slice';
import { useSigninMutation } from '../query';
import { WebSocketClient } from '@/network/websocket';

import LoginForm from '../components/Forms/LoginForm';

import { updateCredentialTokens } from '../helpers';
import { LOGIN_WITH } from '@/utils/constants.util';

const Login: React.FC = () => {
	const [
		signin,
		{
			data: signinResponse,
			isError: isSigninFail,
			isLoading: isSigninLoading,
			isSuccess: isSigninSuccessful,
			error: signInError,
		},
	] = useSigninMutation();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const email = useInput(ValidationType.IS_EMAIL_VALID);
	const password = useInput(ValidationType.IS_PASSWORD_VALID);

	const handleLogin = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			try {
				e.preventDefault();

				email.setIsTouched();
				password.setIsTouched();

				if (!email.isValid || !password.isValid) {
					if (!email.isValid) {
						email.inputRef.current!.focus();
					} else if (!password.isValid) {
						password.inputRef.current!.focus();
					}
					return;
				}

				signin({ email: email.value, password: password.value });
			} catch (error: any) {
				email.inputRef.current!.focus();
				toast.error(
					error?.message ||
						'There was an error during login. Please double check your email or password and try again.',
				);
			}
		},
		[email, password],
	);

	useEffect(() => {
		if ((!isEmpty(signInError) || isSigninFail) && !signinResponse) {
			email.inputRef.current!.focus();
			toast.error(
				(signInError as Error)?.message ||
					'There was an error during login. Please double check your email or password and try again.',
			);
		}
		if (isSigninSuccessful) {
			if (signinResponse) {
				updateCredentialTokens(
					signinResponse.data.accessToken,
					signinResponse.data.refreshToken,
				);

				WebSocketClient.getInstance().connect(signinResponse.data.accessToken);
				dispatch(setAuthenticated());
				dispatch(availableToTransfer());
				navigate('/transfer');
			}
		}
	}, [
		isSigninFail,
		isSigninSuccessful,
		signInError,
		signinResponse,
		dispatch,
		navigate,
	]);

	useEffect(() => {
		localStorage.removeItem(LOGIN_WITH);
	}, []);

	return (
		<LoginForm
			email={email}
			password={password}
			onLogin={handleLogin}
			isLoginStatusLoading={isSigninLoading}
		/>
	);
};

export default Login;
