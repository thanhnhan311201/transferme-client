import React from 'react';

import { Player } from '@lottiefiles/react-lottie-player';
import { IconContext } from 'react-icons';
import { VscLayoutSidebarRight } from 'react-icons/vsc';

const Logo: React.FC = () => {
	return (
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
	);
};

export default Logo;
