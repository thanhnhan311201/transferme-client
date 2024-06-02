import React, { useEffect, useMemo, useState } from 'react';

import classNames from 'classnames';

import { IconContext } from 'react-icons';
import { FaUser } from 'react-icons/fa';
import { Si1Password } from 'react-icons/si';
import { IoSunny } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

import Dialog from '@/components/Dialog';

import ProfileTab from './ProfileTab';
import PasswordTab from './PasswordTab';
import AppearanceTab from './AppearanceTab';
import DeleteAccountTab from './DeleteAccountTab';

export enum SETTING_CONFIG_KEY {
	EDIT_PROFILE = 'edit_profile',
	PASSWORD = 'password',
	APPEARANCE = 'appearance',
	DELETE_ACCOUNT = 'delete_account',
}

const settingConfig = [
	{
		key: SETTING_CONFIG_KEY.EDIT_PROFILE,
		title: 'Edit profile',
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

const SettingDialog: React.FC<{
	isOpen: boolean;
	handleClose: () => void;
}> = ({ handleClose, isOpen }) => {
	const [selectedSettingCfg, setSelectedSettingCfg] =
		useState<SETTING_CONFIG_KEY>(SETTING_CONFIG_KEY.EDIT_PROFILE);

	const handleSelectSettingCfg = (cfg: SETTING_CONFIG_KEY): void => {
		setSelectedSettingCfg(cfg);
	};

	const renderedTab = useMemo(() => {
		switch (selectedSettingCfg) {
			case SETTING_CONFIG_KEY.EDIT_PROFILE:
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
		if (!isOpen) {
			setSelectedSettingCfg(SETTING_CONFIG_KEY.EDIT_PROFILE);
		}
	}, [isOpen]);

	return (
		<Dialog isOpen={isOpen} onClose={handleClose}>
			<div className="w-[48rem] h-[40rem] rounded-3xl p-12 bg-modal">
				<div className="flex w-full h-full">
					<div className="shrink-0 w-[13.25rem] flex flex-col justify-start gap-3">
						<div className="w-ful flex flex-col justify-start gap-2">
							{settingConfig.map((cfg) => (
								<button
									key={cfg.key}
									className={classNames(
										'group flex items-center gap-3 w-full px-[.875rem] py-[.375rem] rounded-full border-2 font-base font-semibold transition-colors bg-setting-dialog__btn-color hover:bg-setting-dialog__btn-hover-color hover:text-setting-dialog__btn-text-hover-color',
										cfg.key === selectedSettingCfg
											? '!border-border-btn-color-selected text-main-text-color !bg-setting-dialog__btn-color'
											: 'border-transparent text-grey'
									)}
									onClick={() => handleSelectSettingCfg(cfg.key)}
								>
									<IconContext.Provider
										value={{
											className: classNames(
												'transition-colors group-hover:fill-setting-dialog__btn-text-hover-color',
												cfg.key === selectedSettingCfg
													? 'fill-main-text-color'
													: 'fill-grey'
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
						<div className="h-[.0625rem] bg-border-color w-full" />
						<button
							className={classNames(
								'flex items-center gap-3 w-full px-[.875rem] py-[.375rem] rounded-full border-2 font-base text-accent-color-1 font-semibold transition-colors bg-setting-dialog__btn-color hover:bg-setting-dialog__btn-hover-color',
								selectedSettingCfg === SETTING_CONFIG_KEY.DELETE_ACCOUNT
									? '!border-accent-color-1 !bg-setting-dialog__btn-color'
									: 'border-transparent'
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

export default SettingDialog;
