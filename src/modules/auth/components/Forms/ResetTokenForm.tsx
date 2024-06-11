import React from 'react';

import { NavLink } from 'react-router-dom';

import { Button } from '@mui/material';
import { motion } from 'framer-motion';

import TextField from '@mui/material/TextField';

const ResetTokenForm: React.FC = () => {
	return (
		<motion.div
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5 }}
			className="w-96 rounded-xl"
		>
			<form className="flex flex-col rounded-xl bg-white px-6 py-8 shadow-lg">
				<div className="mb-8">
					<h2 className="mb-1 text-2xl font-bold">
						We sent a code to your email
					</h2>
					<p className="text-xs">
						Enter the 6-digit verification code sent to your email.
					</p>
					<NavLink to="/auth/reset" className="text-xs font-bold text-blue-500">
						Change
					</NavLink>
				</div>
				<div className="mb-2">
					<TextField
						id="reset-token"
						label="6 digit code"
						variant="outlined"
						type="text"
						sx={{
							height: '3.5rem',
							fontSize: '1rem',
							marginBottom: '0.5rem',
							width: '100%',
							'& .MuiInputBase-root': {
								height: '100%',
								'& .MuiInputBase-input': {
									height: '100%',
									padding: '0 1rem',
									display: 'flex',
									alignItems: 'center',
								},
							},
						}}
						required
					/>
					<p className="text-xs">Code is wrong</p>
				</div>
				<NavLink to="/auth/reset" className="font-bold text-blue-500">
					Resend code
				</NavLink>
				<Button
					variant="contained"
					sx={{
						textTransform: 'none',
						margin: '24px 0',
						borderRadius: '24px',
						height: '3.5rem',
					}}
				>
					Submit
				</Button>
				<p className="text-sm">
					If you dont see the email in your inbox, check your spam folder.
				</p>
			</form>
		</motion.div>
	);
};

export default ResetTokenForm;
