import React from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

import { IconContext } from 'react-icons';
import { PiLockKeyFill } from 'react-icons/pi';

import useInput, { ValidationType } from '@/modules/common/hooks/useInput';
import Input from '@/components/Input';

const PasswordTab: React.FC = () => {
	const currentPassword = useInput(ValidationType.IS_PASSWORD_VALID);
	const newPassword = useInput(ValidationType.IS_PASSWORD_VALID);
	const cfmNewPassword = useInput(ValidationType.IS_PASSWORD_MATCH, {
		password: newPassword.value,
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();

			currentPassword.setIsTouched();
			newPassword.setIsTouched();
			cfmNewPassword.setIsTouched();

			if (
				!currentPassword.isValid ||
				!newPassword.isValid ||
				!cfmNewPassword.isValid
			) {
				if (!currentPassword.isValid) {
					currentPassword.inputRef.current!.focus();
				} else if (!newPassword.isValid) {
					newPassword.inputRef.current!.focus();
				} else if (!cfmNewPassword.isValid) {
					cfmNewPassword.inputRef.current!.focus();
				}
				return;
			}

			console.log('currentPassword...', currentPassword.value);
			console.log('newPassword...', newPassword.value);
			console.log('cfmNewPassword...', cfmNewPassword.value);
		} catch (error: any) {
			currentPassword.inputRef.current!.focus();
			toast.error(
				error?.message ||
					'There was an error during updating password. Please double check password fields and try again.',
			);
		}
	};

	const isFormValid =
		currentPassword.isValid &&
		currentPassword.isTouched &&
		newPassword.isValid &&
		newPassword.isTouched &&
		cfmNewPassword.isValid &&
		cfmNewPassword.isTouched;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="flex h-full w-full flex-col justify-start gap-8"
		>
			<div className="text-main-text-color shrink-0 font-['Inter'] text-3xl font-bold tracking-tight">
				Password
			</div>
			<div className="grow">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col justify-start gap-6"
				>
					<div className="flex flex-col justify-start gap-2">
						<div className="font-base text-main-text-color font-semibold">
							Password
						</div>
						<Input
							className={classNames(
								'bg-setting-dialog__input-bg-color placeholder:text-grey/50 rounded-xl border-2 outline-none transition-colors focus:bg-transparent',
								!currentPassword.isValid && currentPassword.isTouched
									? 'border-accent-color-1'
									: 'border-setting-dialog__input-bg-color',
							)}
							placeholder="Password"
							type="password"
							value={currentPassword.value}
							onChange={currentPassword.handleValueChange}
							onBlur={currentPassword.handleInputBlur}
							ref={currentPassword.inputRef}
							helperText={
								currentPassword.errMessage ? (
									<span className="text-accent-color-1">
										{currentPassword.errMessage}
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
											fill: currentPassword.value
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
					<div className="flex flex-col justify-start gap-2">
						<div className="font-base text-main-text-color font-semibold">
							New password
						</div>
						<Input
							className={classNames(
								'bg-setting-dialog__input-bg-color placeholder:text-grey/50 rounded-xl border-2 outline-none transition-colors focus:bg-transparent',
								!newPassword.isValid && newPassword.isTouched
									? 'border-accent-color-1'
									: 'border-setting-dialog__input-bg-color',
							)}
							placeholder="New password"
							type="password"
							value={newPassword.value}
							onChange={newPassword.handleValueChange}
							onBlur={newPassword.handleInputBlur}
							ref={newPassword.inputRef}
							helperText={
								newPassword.errMessage ? (
									<span className="text-accent-color-1">
										{newPassword.errMessage}
									</span>
								) : (
									<span className="text-grey/50">
										Use 8 or more characters with a mix of letters, numbers &
										symbols.
									</span>
								)
							}
							icon={
								<IconContext.Provider
									value={{
										style: {
											verticalAlign: 'middle',
											width: '1.5rem',
											height: '1.5rem',
											fill: newPassword.value
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
					<div className="flex flex-col justify-start gap-2">
						<div className="font-base text-main-text-color font-semibold">
							Confirm new password
						</div>
						<Input
							className={classNames(
								'bg-setting-dialog__input-bg-color placeholder:text-grey/50 rounded-xl border-2 outline-none transition-colors focus:bg-transparent',
								!cfmNewPassword.isValid && cfmNewPassword.isTouched
									? 'border-accent-color-1'
									: 'border-setting-dialog__input-bg-color',
							)}
							placeholder="Confirm new password"
							type="password"
							value={cfmNewPassword.value}
							onChange={cfmNewPassword.handleValueChange}
							onBlur={cfmNewPassword.handleInputBlur}
							ref={cfmNewPassword.inputRef}
							helperText={
								cfmNewPassword.errMessage ? (
									<span className="text-accent-color-1">
										{cfmNewPassword.errMessage}
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
											fill: cfmNewPassword.value
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
							'font-base bg-accent-color-2 flex h-12 w-full items-center justify-center rounded-xl px-[1.375rem] font-semibold text-white transition-colors',
							isFormValid ? '' : 'opacity-20',
						)}
						type="submit"
						disabled={!isFormValid}
					>
						Change Password
					</button>
				</form>
			</div>
		</motion.div>
	);
};

export default PasswordTab;
