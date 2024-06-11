import React from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import { IoIosHelpCircleOutline } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import { IconContext } from 'react-icons';

import type { User } from '@/modules/user/@types';

import logo from '/images/logo_4.png';

const scaleVariants = {
	normal: { scale: 1 },
	init: { scale: 0.8 },
	tapped: { scale: 1.2 },
};

const Header = React.forwardRef<
	HTMLDivElement,
	{
		userInfo: User | null;
		showUserNav: boolean;
		onHandleShowUserNav: () => void;
		clientId: string | null;
	}
>((props, ref) => {
	return (
		<div className="flex w-full items-center justify-between">
			<div className="px-2 py-4">
				<div className="h-6 pl-5">
					<Link to="/transfer" className="h-full">
						<img className="h-full" src={logo} alt="logo" />
					</Link>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<div className="cursor-pointer rounded-full border-4 border-solid border-transparent hover:border-e0e9f8">
					<IconContext.Provider
						value={{
							style: {
								width: '2rem',
								height: '2rem',
								color: '#555',
							},
						}}
					>
						<IoIosHelpCircleOutline />
					</IconContext.Provider>
				</div>
				<div className="mr-4 flex cursor-pointer items-center justify-end py-2">
					<motion.div
						variants={scaleVariants}
						whileTap="tapped"
						animate="normal"
						initial="init"
					>
						<div
							ref={ref}
							onClick={props.onHandleShowUserNav}
							className={`relative w-11 rounded-full border-4 border-solid hover:border-e0e9f8 ${
								props.showUserNav ? 'border-e0e9f8' : 'border-fafafa'
							}`}
						>
							<img
								className="z-0 w-full rounded-full"
								src={props.userInfo?.profilePhoto}
								alt="User avatar"
								referrerPolicy="no-referrer"
								crossOrigin="anonymous"
							/>
							<IconContext.Provider
								value={{
									style: {
										position: 'absolute',
										width: '1rem',
										height: '1rem',
										bottom: -2,
										right: -2,
										backgroundColor: '#e0e9f8',
										color: '#000',
										zIndex: 100,
										borderRadius: '50%',
										border: '2px solid #fff',
									},
								}}
							>
								<IoIosArrowDown />
							</IconContext.Provider>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
});

Header.displayName = 'Header';
export default Header;
