import React from 'react';

import Logo from './Logo';
import UserProfile from './UserProfile';

const SideMenu: React.FC = () => {
	return (
		<div className="fixed top-0 left-0 bottom-0 flex flex-col pt-[7.5rem] pb-[10.5rem] px-4 w-80 bg-main-bg">
			<Logo />
			<div className="grow"></div>
			<UserProfile />
		</div>
	);
};

export default SideMenu;
