import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { isEmpty } from 'lodash';

import { BsGithub } from 'react-icons/bs';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { IconContext } from 'react-icons';

import socketClient from '@/socket';
import { useAppDispatch } from '@/store';
import { useSigninWithGithubMutation } from '../core/auth.query';
import { setAuthenticated } from '../core/auth.slice';
import { availableToTransfer } from '@/modules/transfer/core/transfer.slice';

import { updateCredentialTokens } from '../utils';

const GitHubAuth: React.FC = () => {
	const [
		signinWithGitHub,
		{
			data: signinWithGitHubResponse,
			isError: isSigninWithGitHubFail,
			isSuccess: isSigninWithGitHubSuccessful,
			error: signInWithGitHubError,
		},
	] = useSigninWithGithubMutation();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			try {
				const queryString = window.location.search;
				const urlParams = new URLSearchParams(queryString);
				const codeParam = urlParams.get('code');

				if (codeParam) {
					signinWithGitHub({ authCode: codeParam });
				} else {
					navigate('/auth/signin');
					toast.error('There was an error during login. Please try again.');
				}
			} catch (error: any) {
				navigate('/auth/signin');
				toast.error(
					error?.message || 'There was an error during login. Please try again.'
				);
			}
		})();
	}, [dispatch]);

	useEffect(() => {
		if (
			(!isEmpty(signInWithGitHubError) || isSigninWithGitHubFail) &&
			!signinWithGitHubResponse
		) {
			navigate('/auth/signin');
			toast.error(
				(signInWithGitHubError as Error)?.message ||
					'There was an error during login. Please try again.'
			);
		}
		if (isSigninWithGitHubSuccessful) {
			if (signinWithGitHubResponse) {
				updateCredentialTokens(
					signinWithGitHubResponse.data.accessToken,
					signinWithGitHubResponse.data.refreshToken
				);
				socketClient.connect({
					token: signinWithGitHubResponse.data.accessToken,
				});
				dispatch(setAuthenticated());
				dispatch(availableToTransfer());
				navigate('/transfer');
			}
		}
	}, [
		isSigninWithGitHubFail,
		isSigninWithGitHubSuccessful,
		signInWithGitHubError,
		signinWithGitHubResponse,
		dispatch,
		navigate,
	]);

	return (
		<motion.div
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="flex flex-col justify-center items-center gap-4 px-6 py-8 rounded-xl shadow-lg bg-white">
				<IconContext.Provider
					value={{
						style: {
							width: '2rem',
							height: '2rem',
						},
					}}
				>
					<BsGithub />
				</IconContext.Provider>
				<span className="text-xl font-medium">
					The login process is being processed.
				</span>
				<span className="text-base">
					You are being redirected to the home page, please do not leave the
					page.
				</span>
				<Box sx={{ width: '100%' }}>
					<LinearProgress color="info" />
				</Box>
			</div>
		</motion.div>
	);
};

export default GitHubAuth;
