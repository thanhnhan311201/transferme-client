import React from 'react';

import SideMenu from './components/SideMenu';
import UserSettingDialog from '@/modules/user/views/UserSettingDialog';
import SearchDialog from '@/modules/search/views/SearchDialog';
import NewTransferDialog from '@/modules/transfer-v2/views/NewTransferDialog';

const TransferPage: React.FC = () => {
	return (
		<>
			<div className="h-screen w-screen bg-main-bg pl-80 pr-6">
				<SideMenu key="side-menu" />
				<div className="flex h-screen py-6">
					<div className="bg-content-bg relative flex max-w-full grow rounded-[1.25rem] pr-[22.5rem]">
						<div className="relative flex max-w-full grow flex-col"></div>
						<div className="border-border-color absolute bottom-0 right-0 top-0 flex w-[22.5rem] flex-col rounded-r-[1.25rem] border-l shadow-[inset_0_1.5rem_3.75rem_rgba(0,0,0,0.1)]"></div>
					</div>
				</div>
			</div>
			<UserSettingDialog key="setting-dialog" />
			<SearchDialog key="search-dialog" />
			<NewTransferDialog key="new-transfer-dialog" />
		</>
	);
};

export default TransferPage;
