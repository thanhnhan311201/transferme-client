import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

import { FcGoogle } from 'react-icons/fc';
import { Button } from '@mui/material';
import { IconContext } from 'react-icons';

import { useAppDispatch } from '@/store';
import { setAuthenticated } from '@/modules/authentication/core/auth.slice';
import { availableToTransfer } from '@/modules/transfer/core/transfer.slice';
import { useSigninWithGoogleMutation } from '@/modules/authentication/core/auth.query';
import socketClient from '@/socket';
import { GOOGLE_REDIRECT_URI } from '@/config';

import { updateCredentialTokens } from '@/modules/authentication/utils';

const GoogleSigninButton: React.FC = () => {
	const [
		signinWithGoogle,
		{
			data: signinWithGoogleResponse,
			isError: isSigninWithGoogleFail,
			isSuccess: isSigninWithGoogleSuccessful,
			error: signInWithGoogleError,
		},
	] = useSigninWithGoogleMutation();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleGoogleSignin = useGoogleLogin({
		onSuccess: async (
			codeResponse: Omit<
				CodeResponse,
				'error' | 'error_description' | 'error_uri'
			>
		) => {
			try {
				if (!codeResponse) {
					toast.error('There was an error during login. Please try again.');
					return;
				}

				signinWithGoogle({ authCode: codeResponse.code });
			} catch (error: any) {
				toast.error(
					error?.message || 'There was an error during login. Please try again.'
				);
			}
		},
		onError: (error) =>
			toast.error(
				error?.error_description ||
					'There was an error during login. Please try again.'
			),
		flow: 'auth-code',
		redirect_uri: GOOGLE_REDIRECT_URI,
	});

	useEffect(() => {
		if (
			(!isEmpty(signInWithGoogleError) || isSigninWithGoogleFail) &&
			!signinWithGoogleResponse
		) {
			toast.error(
				(signInWithGoogleError as Error)?.message ||
					'There was an error during login. Please try again.'
			);
		}
		if (isSigninWithGoogleSuccessful) {
			if (signinWithGoogleResponse) {
				updateCredentialTokens(
					signinWithGoogleResponse.data.accessToken,
					signinWithGoogleResponse.data.refreshToken
				);
				socketClient.connect({
					token: signinWithGoogleResponse.data.accessToken,
				});
				dispatch(setAuthenticated());
				dispatch(availableToTransfer());
				navigate('/transfer');
			}
		}
	}, [
		isSigninWithGoogleFail,
		isSigninWithGoogleSuccessful,
		signInWithGoogleError,
		signinWithGoogleResponse,
		dispatch,
		navigate,
	]);

	return (
		<Button
			onClick={handleGoogleSignin}
			variant="outlined"
			sx={{
				textTransform: 'none',
				borderRadius: '24px',
				height: '3.5rem',
			}}
		>
			<IconContext.Provider
				value={{
					style: {
						verticalAlign: 'middle',
						width: '1.5rem',
						height: '1.5rem',
						marginRight: '0.5rem',
					},
				}}
			>
				<FcGoogle /> Sign in with Google
			</IconContext.Provider>
		</Button>
	);
};

export default GoogleSigninButton;
