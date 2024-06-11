import React from 'react';

import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';

const ResetPassForm: React.FC = () => {
	const navigate = useNavigate();

	return (
		<motion.div
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5 }}
			className="w-96 rounded-xl"
		>
			<form className="flex flex-col rounded-xl bg-white px-6 py-8 shadow-lg">
				<div className="mb-8">
					<h2 className="mb-1 text-4xl font-bold">Reset password</h2>
					<p className="text-xs">Reset password in two quick steps</p>
				</div>
				<div className="mb-6">
					<TextField
						id="email"
						label="Email"
						name="email"
						variant="outlined"
						type="email"
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
				</div>
				<Button
					variant="contained"
					sx={{
						textTransform: 'none',
						marginBottom: '0.5rem',
						borderRadius: '24px',
						height: '3.5rem',
					}}
				>
					Reset password
				</Button>
				<Button
					onClick={() => navigate('/auth/signin')}
					variant="text"
					sx={{
						textTransform: 'none',
						marginBottom: '0.5rem',
						borderRadius: '24px',
						height: '3.5rem',
					}}
				>
					Back
				</Button>
			</form>
		</motion.div>
	);
};

export default ResetPassForm;
