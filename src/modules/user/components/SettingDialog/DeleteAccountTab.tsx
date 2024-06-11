import React from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

import { IconContext } from 'react-icons';
import { PiLockKeyFill } from 'react-icons/pi';

import useInput, { ValidationType } from '@/modules/common/hooks/useInput';

import Input from '@/components/Input';

const DeleteAccountTab: React.FC = () => {
	const password = useInput(ValidationType.IS_PASSWORD_VALID);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			password.setIsTouched();

			if (!password.isValid) {
				password.inputRef.current!.focus();
				return;
			}

			console.log(password.value);
		} catch (error: any) {
			password.inputRef.current!.focus();
			toast.error(
				error?.message ||
					'There was an error during the process. Please double check your password and try again.',
			);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="flex h-full w-full flex-col justify-start gap-8"
		>
			<div className="text-main-text-color shrink-0 font-['Inter'] text-3xl font-bold tracking-tight">
				{`We're so sorry to see you go`}
			</div>
			<div className="flex grow flex-col justify-start gap-6">
				<div className="text-grey shrink-0 font-['Inter'] text-xs font-medium">
					Warning: Deleting your account will permanently remove all of your
					data and cannot be undone. This includes your profile, transfer
					histories, and any other information associated with your account. Are
					you sure you want to proceed with deleting your account?
				</div>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col justify-start gap-6"
				>
					<div className="flex flex-col justify-start gap-2">
						<div className="font-base text-main-text-color font-semibold">
							Your password
						</div>
						<Input
							className={classNames(
								'bg-setting-dialog__input-bg-color placeholder:text-grey/50 rounded-xl border-2 outline-none transition-colors focus:bg-transparent',
								!password.isValid && password.isTouched
									? 'border-accent-color-1'
									: 'border-setting-dialog__input-bg-color',
							)}
							placeholder="Password"
							type="password"
							value={password.value}
							onChange={password.handleValueChange}
							onBlur={password.handleInputBlur}
							ref={password.inputRef}
							helperText={
								password.errMessage ? (
									<span className="text-accent-color-1">
										{password.errMessage}
									</span>
								) : null
							}
							icon={
								<IconContext.Provider
									value={{
										style: {
											verticalAlign: 'middle',
											width: '1.5rem',
											height: '1.5rem',
											fill: password.value
												? 'rgba(108, 114, 117)'
												: 'rgba(108, 114, 117, 0.5)',
										},
									}}
								>
									<PiLockKeyFill />
								</IconContext.Provider>
							}
						/>
					</div>
					<button
						className={classNames(
							'font-base bg-accent-color-1 flex h-12 w-full items-center justify-center rounded-xl px-[1.375rem] font-semibold text-white transition-colors',
							password.isValid && password.isTouched ? '' : 'opacity-20',
						)}
						type="submit"
						disabled={!(password.isValid && password.isTouched)}
					>
						Delete account
					</button>
				</form>
			</div>
		</motion.div>
	);
};

export default DeleteAccountTab;
