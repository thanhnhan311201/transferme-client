import React from 'react';

import { useCallback, useEffect } from 'react';

import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

import { useInput, ValidationType } from '../hooks';
import { useSignupMutation } from '../core/auth.query';

import RegisterForm from '../components/Forms/RegisterForm';

import { LOGIN_WITH } from '@/utils/constants.util';

const Register: React.FC = () => {
	const [
		signup,
		{
			data: signupResponse,
			isError: isSignupFail,
			isLoading: isSignupLoading,
			isSuccess: isSignupSuccessful,
			error: signupError,
		},
	] = useSignupMutation();

	const email = useInput(ValidationType.IS_EMAIL_VALID, {
		isCheckEmailExist: true,
	});
	const username = useInput(ValidationType.REQUIRED, {
		maxLength: 30,
	});
	const password = useInput(ValidationType.IS_PASSWORD_VALID);
	const cfmPassword = useInput(ValidationType.IS_PASSWORD_MATCH, {
		password: password.value,
	});

	const handleSignup = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			try {
				e.preventDefault();

				email.setIsTouched();
				username.setIsTouched();
				password.setIsTouched();
				cfmPassword.setIsTouched();

				if (
					!email.isValid ||
					!username.isValid ||
					!password.isValid ||
					!cfmPassword.isValid
				) {
					if (!username.isValid) {
						username.inputRef.current!.focus();
					} else if (!email.isValid) {
						email.inputRef.current!.focus();
					} else if (!password.isValid) {
						password.inputRef.current!.focus();
					} else if (!cfmPassword.isValid) {
						cfmPassword.inputRef.current!.focus();
					}
					return;
				}

				signup({
					username: username.value,
					email: email.value,
					password: password.value,
					confirmPassword: cfmPassword.value,
				});
			} catch (error: any) {
				email.inputRef.current!.focus();
				toast.error(
					error?.message ||
						'There was an error during your account creation. Please double check input fields and try again.'
				);
			}
		},
		[email, username, password, cfmPassword]
	);

	useEffect(() => {
		if ((!isEmpty(signupError) || isSignupFail) && !signupResponse) {
			email.inputRef.current!.focus();
			toast.error(
				(signupError as Error)?.message ||
					'There was an error during your account creation. Please double check input fields and try again.'
			);
		}
		if (isSignupSuccessful) {
			if (signupResponse) {
				email.resetValue();
				username.resetValue();
				password.resetValue();
				cfmPassword.resetValue();
				toast.success(
					'Your account has been successfully created. Please go to login page!'
				);
			}
		}
	}, [isSignupFail, isSignupSuccessful, signupError, signupResponse]);

	useEffect(() => {
		localStorage.removeItem(LOGIN_WITH);
	}, []);

	return (
		<RegisterForm
			email={email}
			username={username}
			password={password}
			confirmPassword={cfmPassword}
			onSignup={handleSignup}
			isSignupStatusLoading={isSignupLoading}
		/>
	);
};

export default Register;
