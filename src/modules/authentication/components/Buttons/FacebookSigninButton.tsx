import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

import { Button } from '@mui/material';
import { IconContext } from 'react-icons';
import { FaFacebook } from 'react-icons/fa';

import { useSigninWithFacebookMutation } from '@/modules/authentication/controller/auth.query';
import { useAppDispatch } from '@/store';
import { setAuthenticated } from '@/modules/authentication/controller/auth.slice';
import { availableToTransfer } from '@/modules/transfer/controller/transfer.slice';
import socketClient from '@/socket';

import { facebookSignin } from '@/utils/facebookSDK';
import { updateCredentialTokens } from '@/modules/authentication/utils';

const FacebookSigninButton: React.FC = () => {
	const [
		signinWithFacebook,
		{
			data: signinWithFacebookResponse,
			isError: isSigninWithFacebookFail,
			isSuccess: isSigninWithFacebookSuccessful,
			error: signInWithFacebookError,
		},
	] = useSigninWithFacebookMutation();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSigninWithFacebook = async () => {
		try {
			const response: any = await facebookSignin();
			if (response.status === 'connected') {
				(window as any).FB.api(
					'/me',
					'get',
					{
						access_token: response.authResponse.accessToken,
						fields: 'email,name,picture{url}',
					},
					function (response: any) {
						if (!response) {
							toast.error('There was an error during login. Please try again.');
							return;
						}

						signinWithFacebook({
							facebookId: response.userId,
							email: response.email,
							username: response.name,
							profilePhoto: response.picture.data,
						});
					}
				);
			} else {
				toast.error('There was an error during login. Please try again.');
			}
		} catch (error: any) {
			toast.error(
				error?.message || 'There was an error during login. Please try again.'
			);
		}
	};

	useEffect(() => {
		if (
			(!isEmpty(signInWithFacebookError) || isSigninWithFacebookFail) &&
			!signinWithFacebookResponse
		) {
			toast.error(
				(signInWithFacebookError as Error)?.message ||
					'There was an error during login. Please try again.'
			);
		}
		if (isSigninWithFacebookSuccessful) {
			if (signinWithFacebookResponse) {
				updateCredentialTokens(
					signinWithFacebookResponse.data.accessToken,
					signinWithFacebookResponse.data.refreshToken
				);
				socketClient.connect({
					token: signinWithFacebookResponse.data.accessToken,
				});
				dispatch(setAuthenticated());
				dispatch(availableToTransfer());
				navigate('/transfer');
			}
		}
	}, [
		isSigninWithFacebookFail,
		isSigninWithFacebookSuccessful,
		signInWithFacebookError,
		signinWithFacebookResponse,
		dispatch,
		navigate,
	]);

	return (
		<Button
			onClick={handleSigninWithFacebook}
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
				<FaFacebook /> Sign in with Facebook
			</IconContext.Provider>
		</Button>
	);
};

export default FacebookSigninButton;
