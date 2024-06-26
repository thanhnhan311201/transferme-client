import React from 'react';
import { NavLink } from 'react-router-dom';

import { motion } from 'framer-motion';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button, Divider } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { UseInputHook } from '@/modules/common/hooks';

import FacebookSigninButton from '../Buttons/FacebookSigninButton';
import GitHubSigninButton from '../Buttons/GitHubSigninButton';
import GoogleSigninButton from '../Buttons/GoogleSigninButton';

const LoginForm: React.FC<{
	email: UseInputHook;
	password: UseInputHook;
	onLogin: (e: React.FormEvent<HTMLFormElement>) => void;
	isLoginStatusLoading: boolean;
}> = (props) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5 }}
			className="w-96 rounded-xl"
		>
			<form
				onSubmit={props.onLogin}
				className="mb-8 flex flex-col rounded-xl bg-white px-6 py-8 shadow-lg"
			>
				<div className="mb-8 flex items-start justify-between">
					<div>
						<h2 className="mb-1 text-4xl font-bold">Sign in</h2>
						<p className="text-xs">Transfering faster than your love with ex</p>
					</div>
					<div className="flex">
						{props.isLoginStatusLoading && <CircularProgress />}
					</div>
				</div>
				<div className="mb-4">
					<TextField
						error={Boolean(props.email.errMessage)}
						id="email"
						name="email"
						label="Email"
						value={props.email.value}
						onChange={props.email.handleValueChange}
						onBlur={props.email.handleInputBlur}
						inputRef={props.email.inputRef}
						variant="outlined"
						type="email"
						helperText={props.email.errMessage ? props.email.errMessage : ''}
						sx={{
							fontSize: '1rem',
							marginBottom: '0.5rem',
							width: '100%',
							'& .MuiInputBase-input': {
								height: '3.5rem',
								padding: '0 1rem',
								display: 'flex',
								alignItems: 'center',
							},
						}}
						required
					/>
				</div>
				<div className="mb-6">
					<TextField
						error={Boolean(props.password.errMessage)}
						id="password"
						label="Password"
						variant="outlined"
						type="password"
						value={props.password.value}
						onChange={props.password.handleValueChange}
						onBlur={props.password.handleInputBlur}
						inputRef={props.password.inputRef}
						helperText={
							props.password.errMessage ? props.password.errMessage : ''
						}
						sx={{
							fontSize: '1rem',
							marginBottom: '0.5rem',
							width: '100%',
							'& .MuiInputBase-input': {
								height: '3.5rem',
								padding: '0 1rem',
								display: 'flex',
								alignItems: 'center',
							},
						}}
						required
					/>
				</div>
				<Button
					variant="contained"
					type="submit"
					sx={{
						textTransform: 'none',
						marginBottom: '1.5rem',
						borderRadius: '24px',
						height: '3.5rem',
					}}
				>
					Sign in
				</Button>
				<p className="text-center text-sm">
					Forgotten your password?{' '}
					<NavLink className="font-bold text-blue-500" to="/auth/reset">
						Reset password
					</NavLink>
				</p>
				<Divider
					sx={{
						margin: '1.375rem 0',
					}}
				>
					or
				</Divider>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: '.75rem',
					}}
				>
					<GoogleSigninButton />
					<FacebookSigninButton />
					<GitHubSigninButton />
				</Box>
			</form>
			<p className="text-center text-base">
				New to TransferMe?
				<NavLink className="font-bold text-blue-500" to="/auth/signup">
					{' '}
					Join now
				</NavLink>
			</p>
		</motion.div>
	);
};

export default LoginForm;
