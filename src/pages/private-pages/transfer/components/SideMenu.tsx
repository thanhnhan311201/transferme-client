import React from 'react';

import { Player } from '@lottiefiles/react-lottie-player';
import { VscLayoutSidebarRight } from 'react-icons/vsc';
import { IconContext } from 'react-icons';
import { IoSearch } from 'react-icons/io5';
import { FaRegPaperPlane } from 'react-icons/fa6';
import { MdOutlineSettings } from 'react-icons/md';

import { useAppDispatch } from '@/store';
import { openUserSetting } from '@/modules/user/core/user.slice';

import UserProfile from '@/modules/user/views/UserProfile';
import TransferList from '@/modules/transfer-v2/views/TransferList';

const SideMenu: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleOpenUserSettingDialog = () => {
		dispatch(openUserSetting());
	};

	return (
		<div className="fixed top-0 left-0 bottom-0 flex flex-col pt-[7.5rem] pb-[10.5rem] px-4 w-80 bg-main-bg">
			<div className="absolute top-0 left-0 right-0 h-[7.5rem] pl-7 pr-6 flex items-center justify-between">
				<a className="flex items-center justify-center gap-2" href="/transfer">
					<Player
						autoplay
						loop
						className="[&_path]:stroke-white"
						src="/lotties/send.json"
						style={{ height: '48px', width: 'auto' }}
					/>
					<span className="font-['Nunito'] text-white text-[1.75rem] leading-9 font-bold">
						TransferMe
					</span>
				</a>
				<button className="group">
					<IconContext.Provider
						value={{
							style: {
								verticalAlign: 'middle',
								width: '1.5rem',
								height: '1.5rem',
							},
						}}
					>
						<VscLayoutSidebarRight className="fill-grey group-hover:fill-white--1 transition-colors" />
					</IconContext.Provider>
				</button>
			</div>
			<div className="grow flex flex-col items-start justify-start gap-4 w-full overflow-hidden">
				<div className="flex flex-col items-start justify-start w-full">
					<div className="rounded-lg shrink-0 h-12 w-full flex items-center gap-5 px-5 font-base text-grey hover:text-white transition-colors font-semibold hover:shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.05),0_0.25rem_0.5rem_0_rgba(0,0,0,0.1)] cursor-pointer">
						<IconContext.Provider
							value={{
								style: {
									verticalAlign: 'middle',
									width: '1.5rem',
									height: '1.5rem',
									color: '#3fdd78',
								},
							}}
						>
							<IoSearch />
						</IconContext.Provider>
						<span>Search</span>
					</div>
					<div className="rounded-lg shrink-0 h-12 w-full flex items-center gap-5 px-5 font-base text-grey hover:text-white transition-colors font-semibold hover:shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.05),0_0.25rem_0.5rem_0_rgba(0,0,0,0.1)] cursor-pointer">
						<IconContext.Provider
							value={{
								style: {
									verticalAlign: 'middle',
									width: '1.5rem',
									height: '1.5rem',
									color: '#3e90f0',
								},
							}}
						>
							<FaRegPaperPlane />
						</IconContext.Provider>
						<span>New Transfer</span>
					</div>
					<div
						className="rounded-lg shrink-0 h-12 w-full flex items-center gap-5 px-5 font-base text-grey hover:text-white transition-colors font-semibold hover:shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.05),0_0.25rem_0.5rem_0_rgba(0,0,0,0.1)] cursor-pointer"
						onClick={handleOpenUserSettingDialog}
					>
						<IconContext.Provider
							value={{
								style: {
									verticalAlign: 'middle',
									width: '1.5rem',
									height: '1.5rem',
									color: '#8e55ea',
								},
							}}
						>
							<MdOutlineSettings />
						</IconContext.Provider>
						<span>Settings</span>
					</div>
				</div>
				<div className="h-[.0625rem] -mx-2 bg-secondary-color w-full" />
				<TransferList />
			</div>
			<UserProfile key="user-profile" />
		</div>
	);
};

export default SideMenu;
