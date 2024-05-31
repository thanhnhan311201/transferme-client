import React, { useState } from 'react';

import classNames from 'classnames';

import { IconContext } from 'react-icons';
import { IoSearch } from 'react-icons/io5';
import { FaRegPaperPlane } from 'react-icons/fa6';
import { MdOutlineSettings } from 'react-icons/md';
import { BsCircleFill } from 'react-icons/bs';

import Logo from './Logo';
import UserProfile from './UserProfile';

const userList = [
	{
		id: 1,
		avatar:
			'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/368294034_3628138450755125_1903121321189230784_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=e8X1o0rkPKIQ7kNvgFpqCRz&_nc_ht=scontent.fsgn5-15.fna&oh=00_AYCB-1GDzHXHPMMGvQHRCDq7LUSSsZvyUtihpp4pxpjRLw&oe=665DD78F',
		name: 'Nhan Phan',
		isOnline: true,
	},
	{
		id: 2,
		avatar:
			'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/368294034_3628138450755125_1903121321189230784_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=e8X1o0rkPKIQ7kNvgFpqCRz&_nc_ht=scontent.fsgn5-15.fna&oh=00_AYCB-1GDzHXHPMMGvQHRCDq7LUSSsZvyUtihpp4pxpjRLw&oe=665DD78F',
		name: 'Nhan Phan',
		isOnline: true,
	},
	{
		id: 3,
		avatar:
			'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/368294034_3628138450755125_1903121321189230784_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=e8X1o0rkPKIQ7kNvgFpqCRz&_nc_ht=scontent.fsgn5-15.fna&oh=00_AYCB-1GDzHXHPMMGvQHRCDq7LUSSsZvyUtihpp4pxpjRLw&oe=665DD78F',
		name: 'Nhan Phan',
		isOnline: false,
	},
	{
		id: 4,
		avatar:
			'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/368294034_3628138450755125_1903121321189230784_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=e8X1o0rkPKIQ7kNvgFpqCRz&_nc_ht=scontent.fsgn5-15.fna&oh=00_AYCB-1GDzHXHPMMGvQHRCDq7LUSSsZvyUtihpp4pxpjRLw&oe=665DD78F',
		name: 'Nhan Phan',
		isOnline: false,
	},
	{
		id: 5,
		avatar:
			'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/368294034_3628138450755125_1903121321189230784_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=e8X1o0rkPKIQ7kNvgFpqCRz&_nc_ht=scontent.fsgn5-15.fna&oh=00_AYCB-1GDzHXHPMMGvQHRCDq7LUSSsZvyUtihpp4pxpjRLw&oe=665DD78F',
		name: 'Nhan Phan',
		isOnline: false,
	},
	{
		id: 6,
		avatar:
			'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/368294034_3628138450755125_1903121321189230784_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=e8X1o0rkPKIQ7kNvgFpqCRz&_nc_ht=scontent.fsgn5-15.fna&oh=00_AYCB-1GDzHXHPMMGvQHRCDq7LUSSsZvyUtihpp4pxpjRLw&oe=665DD78F',
		name: 'Nhan Phan',
		isOnline: true,
	},
	{
		id: 7,
		avatar:
			'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/368294034_3628138450755125_1903121321189230784_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=e8X1o0rkPKIQ7kNvgFpqCRz&_nc_ht=scontent.fsgn5-15.fna&oh=00_AYCB-1GDzHXHPMMGvQHRCDq7LUSSsZvyUtihpp4pxpjRLw&oe=665DD78F',
		name: 'Nhan Phan',
		isOnline: false,
	},
	{
		id: 8,
		avatar:
			'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/368294034_3628138450755125_1903121321189230784_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=e8X1o0rkPKIQ7kNvgFpqCRz&_nc_ht=scontent.fsgn5-15.fna&oh=00_AYCB-1GDzHXHPMMGvQHRCDq7LUSSsZvyUtihpp4pxpjRLw&oe=665DD78F',
		name: 'Nhan Phan',
		isOnline: false,
	},
	{
		id: 9,
		avatar:
			'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/368294034_3628138450755125_1903121321189230784_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=e8X1o0rkPKIQ7kNvgFpqCRz&_nc_ht=scontent.fsgn5-15.fna&oh=00_AYCB-1GDzHXHPMMGvQHRCDq7LUSSsZvyUtihpp4pxpjRLw&oe=665DD78F',
		name: 'Nhan Phan',
		isOnline: false,
	},
	{
		id: 10,
		avatar:
			'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/368294034_3628138450755125_1903121321189230784_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=e8X1o0rkPKIQ7kNvgFpqCRz&_nc_ht=scontent.fsgn5-15.fna&oh=00_AYCB-1GDzHXHPMMGvQHRCDq7LUSSsZvyUtihpp4pxpjRLw&oe=665DD78F',
		name: 'Nhan Phan',
		isOnline: false,
	},
	{
		id: 11,
		avatar:
			'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/368294034_3628138450755125_1903121321189230784_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=e8X1o0rkPKIQ7kNvgFpqCRz&_nc_ht=scontent.fsgn5-15.fna&oh=00_AYCB-1GDzHXHPMMGvQHRCDq7LUSSsZvyUtihpp4pxpjRLw&oe=665DD78F',
		name: 'Nhan Phan',
		isOnline: true,
	},
];

const SideMenu: React.FC<{ onOpenSettingDialog: () => void }> = ({
	onOpenSettingDialog,
}) => {
	const [selectedTransferId, setSelectedTransferId] = useState<number>(1);

	return (
		<div className="fixed top-0 left-0 bottom-0 flex flex-col pt-[7.5rem] pb-[10.5rem] px-4 w-80 bg-main-bg">
			<Logo key="transfer-logo" />
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
						onClick={onOpenSettingDialog}
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
				<div className="grow flex flex-col items-start justify-start w-full pb-2 overflow-hidden">
					<div className="shrink-0 w-full text-left px-5 py-4 font-base text-grey/75">
						Transfer list
					</div>
					<div className="transfer-list grow flex flex-col justify-start gap-2 w-full overflow-y-auto scroll-smooth">
						{userList.map((user) => (
							<button
								key={user.id}
								className={classNames(
									'rounded-lg w-full px-5 py-2 flex items-center gap-4 font-base text-white--1/75 font-semibold transition-colors hover:text-white',
									selectedTransferId === user.id
										? 'bg-gradient-to-l from-[#323337] to-[rgba(80,62,110,0.29)] text-white'
										: ''
								)}
								onClick={() => setSelectedTransferId(user.id)}
							>
								<div className="relative basis-12 h-12 shrink-0">
									<img
										className="rounded-full w-full"
										src={user.avatar}
										alt="User avatar"
										referrerPolicy="no-referrer"
										crossOrigin="anonymous"
									/>
									{user.isOnline && (
										<IconContext.Provider
											value={{
												style: {
													position: 'absolute',
													width: '1.125rem',
													height: '1.125rem',
													color: '#46ab5e',
													bottom: -2,
													right: -2,
													border: '4px solid #232627',
													borderRadius: '50%',
												},
											}}
										>
											<BsCircleFill />
										</IconContext.Provider>
									)}
								</div>
								<div className="overflow-hidden grow truncate text-left">
									{user.name}
								</div>
							</button>
						))}
					</div>
				</div>
			</div>
			<UserProfile key="user-profile" />
		</div>
	);
};

export default SideMenu;
