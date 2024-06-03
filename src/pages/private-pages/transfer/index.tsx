import React from 'react';

import SideMenu from './components/SideMenu';
import UserSettingDialog from '@/modules/user/views/UserSettingDialog';

const TransferPage: React.FC = () => {
	return (
		<>
			<div className="bg-main-bg h-screen w-screen pl-80 pr-6">
				<SideMenu key="side-menu" />
				<div className="h-screen py-6 flex">
					<div className="relative flex grow max-w-full rounded-[1.25rem] pr-[22.5rem] bg-content-bg">
						<div className="relative flex flex-col grow max-w-full"></div>
						<div className="absolute top-0 right-0 bottom-0 flex flex-col w-[22.5rem] rounded-r-[1.25rem] border-l border-border-color shadow-[inset_0_1.5rem_3.75rem_rgba(0,0,0,0.1)]"></div>
					</div>
				</div>
			</div>
			<UserSettingDialog key="setting-dialog" />
		</>
	);
};

export default TransferPage;
