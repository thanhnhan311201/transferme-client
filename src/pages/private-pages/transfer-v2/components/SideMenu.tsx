import React from 'react';

import { Player } from '@lottiefiles/react-lottie-player';
import { VscLayoutSidebarRight } from 'react-icons/vsc';
import { IconContext } from 'react-icons';
import { IoSearch } from 'react-icons/io5';
import { MdOutlineSettings } from 'react-icons/md';

import { useAppDispatch } from '@/store';
import { openUserSettingDialog } from '@/modules/user/state/user.slice';
import { openSearchDialog } from '@/modules/search/core/search.slice';

import UserProfile from '@/modules/user/views/UserProfile';
import TransferList from '@/modules/transfer-v2/views/TransferList';

import TransferIcon from '@/components/TransferIcon';
import { openNewTransferDialog } from '@/modules/transfer-v2/state/transfer.slice';

const SideMenu: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleOpenUserSettingDialog = () => {
		dispatch(openUserSettingDialog());
	};
	const handleOpenSearchDialog = () => {
		dispatch(openSearchDialog());
	};
	const handleOpenNewTransferDialog = () => {
		dispatch(openNewTransferDialog());
	};

	return (
		<div className="fixed bottom-0 left-0 top-0 flex w-80 flex-col bg-main-bg px-4 pb-[10.5rem] pt-[7.5rem]">
			<div className="absolute left-0 right-0 top-0 flex h-[7.5rem] items-center justify-between pl-7 pr-6">
				<a className="flex items-center justify-center gap-2" href="/transfer">
					<Player
						autoplay
						loop
						className="[&_path]:stroke-white"
						src="/lotties/send.json"
						style={{ height: '48px', width: 'auto' }}
					/>
					<span className="font-['Nunito'] text-[1.75rem] font-bold leading-9 text-white">
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
			<div className="flex w-full grow flex-col items-start justify-start gap-4 overflow-hidden">
				<div className="flex w-full flex-col items-start justify-start">
					<div
						className="font-base text-grey flex h-12 w-full shrink-0 cursor-pointer items-center gap-5 rounded-lg px-5 font-semibold transition-colors hover:text-white hover:shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.05),0_0.25rem_0.5rem_0_rgba(0,0,0,0.1)]"
						onClick={handleOpenSearchDialog}
					>
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
					<div
						className="font-base text-grey flex h-12 w-full shrink-0 cursor-pointer items-center gap-5 rounded-lg px-5 font-semibold transition-colors hover:text-white hover:shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.05),0_0.25rem_0.5rem_0_rgba(0,0,0,0.1)]"
						onClick={handleOpenNewTransferDialog}
					>
						<TransferIcon width={24} height={24} />
						<span>New Transfer</span>
					</div>
					<div
						className="font-base text-grey flex h-12 w-full shrink-0 cursor-pointer items-center gap-5 rounded-lg px-5 font-semibold transition-colors hover:text-white hover:shadow-[inset_0px_0.0625rem_0_rgba(255,255,255,0.05),0_0.25rem_0.5rem_0_rgba(0,0,0,0.1)]"
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
				<div className="bg-secondary-color -mx-2 h-[.0625rem] w-full" />
				<TransferList />
			</div>
			<UserProfile key="user-profile" />
		</div>
	);
};

export default SideMenu;
