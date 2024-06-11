import React, { useEffect, useMemo, useState, useCallback } from 'react';

import classNames from 'classnames';

import { IconContext } from 'react-icons';
import { FaUser } from 'react-icons/fa';
import { Si1Password } from 'react-icons/si';
import { IoSunny } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

import { useAppSelector, useAppDispatch } from '@/store';
import { closeUserSettingDialog } from '../state/user.slice';

import Dialog from '@/components/Dialog';

import ProfileTab from '../components/SettingDialog/ProfileTab';
import PasswordTab from '../components/SettingDialog/PasswordTab';
import AppearanceTab from '../components/SettingDialog/AppearanceTab';
import DeleteAccountTab from '../components/SettingDialog/DeleteAccountTab';

export enum SETTING_CONFIG_KEY {
	PROFILE = 'profile',
	PASSWORD = 'password',
	APPEARANCE = 'appearance',
	DELETE_ACCOUNT = 'delete_account',
}

const settingConfig = [
	{
		key: SETTING_CONFIG_KEY.PROFILE,
		title: 'Profile',
		icon: <FaUser />,
	},
	{
		key: SETTING_CONFIG_KEY.PASSWORD,
		title: 'Password',
		icon: <Si1Password />,
	},
	{
		key: SETTING_CONFIG_KEY.APPEARANCE,
		title: 'Apprearance',
		icon: <IoSunny />,
	},
];

const UserSettingDialog: React.FC = () => {
	const [selectedSettingCfg, setSelectedSettingCfg] =
		useState<SETTING_CONFIG_KEY>(SETTING_CONFIG_KEY.PROFILE);

	const { isOpenUserSettingDialog } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	const handleCloseUserSettingDialog = useCallback(() => {
		dispatch(closeUserSettingDialog());
	}, []);

	const handleSelectSettingCfg = (cfg: SETTING_CONFIG_KEY): void => {
		setSelectedSettingCfg(cfg);
	};

	const renderedTab = useMemo(() => {
		switch (selectedSettingCfg) {
			case SETTING_CONFIG_KEY.PROFILE:
				return <ProfileTab />;
			case SETTING_CONFIG_KEY.PASSWORD:
				return <PasswordTab />;
			case SETTING_CONFIG_KEY.APPEARANCE:
				return <AppearanceTab />;
			case SETTING_CONFIG_KEY.DELETE_ACCOUNT:
				return <DeleteAccountTab />;
			default:
				return <div></div>;
		}
	}, [selectedSettingCfg]);

	useEffect(() => {
		if (!isOpenUserSettingDialog) {
			setSelectedSettingCfg(SETTING_CONFIG_KEY.PROFILE);
		}
	}, [isOpenUserSettingDialog]);

	return (
		<Dialog
			isOpen={isOpenUserSettingDialog}
			onClose={handleCloseUserSettingDialog}
		>
			<div className="bg-modal h-[40rem] w-[48rem] rounded-3xl p-12">
				<div className="flex h-full w-full">
					<div className="flex w-[13.25rem] shrink-0 flex-col justify-start gap-3">
						<div className="w-ful flex flex-col justify-start gap-2">
							{settingConfig.map((cfg) => (
								<button
									key={cfg.key}
									className={classNames(
										'font-base bg-setting-dialog__btn-color hover:bg-setting-dialog__btn-hover-color group flex w-full items-center gap-3 rounded-full border-2 px-[.875rem] py-[.375rem] font-semibold transition-colors',
										cfg.key === selectedSettingCfg
											? '!border-border-btn-color-selected !bg-setting-dialog__btn-color text-main-text-color'
											: 'text-grey hover:text-setting-dialog__btn-text-hover-color border-transparent',
									)}
									onClick={() => handleSelectSettingCfg(cfg.key)}
								>
									<IconContext.Provider
										value={{
											className: classNames(
												'transition-colors',
												cfg.key === selectedSettingCfg
													? 'fill-main-text-color'
													: 'fill-grey group-hover:fill-setting-dialog__btn-text-hover-color',
											),
											style: {
												verticalAlign: 'middle',
												width: '1rem',
												height: '1rem',
											},
										}}
									>
										{cfg.icon}
									</IconContext.Provider>
									<span className="transition-colors">{cfg.title}</span>
								</button>
							))}
						</div>
						<div className="bg-border-color h-[.0625rem] w-full" />
						<button
							className={classNames(
								'font-base bg-setting-dialog__btn-color text-accent-color-1 hover:bg-setting-dialog__btn-hover-color flex w-full items-center gap-3 rounded-full border-2 px-[.875rem] py-[.375rem] font-semibold transition-colors',
								selectedSettingCfg === SETTING_CONFIG_KEY.DELETE_ACCOUNT
									? '!border-accent-color-1 !bg-setting-dialog__btn-color'
									: 'border-transparent',
							)}
							onClick={() =>
								handleSelectSettingCfg(SETTING_CONFIG_KEY.DELETE_ACCOUNT)
							}
						>
							<IconContext.Provider
								value={{
									style: {
										verticalAlign: 'middle',
										width: '1rem',
										height: '1rem',
										fill: '#d84c10',
									},
								}}
							>
								<MdDelete />
							</IconContext.Provider>
							<span>Delete account</span>
						</button>
					</div>
					<div className="grow pl-12">{renderedTab}</div>
				</div>
			</div>
		</Dialog>
	);
};

export default UserSettingDialog;
