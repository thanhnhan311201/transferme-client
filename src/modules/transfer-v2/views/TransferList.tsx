import React, { useState } from 'react';

import classNames from 'classnames';

import { IconContext } from 'react-icons';
import { BsCircleFill } from 'react-icons/bs';

const transferList = [
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

const TransferList = () => {
	const [selectedTransferId, setSelectedTransferId] = useState<number>(1);

	return (
		<div className="flex w-full grow flex-col items-start justify-start overflow-hidden pb-2">
			<div className="font-base text-grey/75 w-full shrink-0 px-5 py-4 text-left">
				Transfer list
			</div>
			<div className="transfer-list flex w-full grow flex-col justify-start gap-2 overflow-y-auto scroll-smooth">
				{transferList.map((user) => (
					<button
						key={user.id}
						className={classNames(
							'font-base text-white--1/75 flex w-full items-center gap-4 rounded-lg px-5 py-2 font-semibold transition-colors hover:text-white',
							selectedTransferId === user.id
								? 'bg-gradient-to-l from-[#323337] to-[rgba(80,62,110,0.29)] text-white'
								: '',
						)}
						onClick={() => setSelectedTransferId(user.id)}
					>
						<div className="relative h-12 shrink-0 basis-12">
							<img
								className="w-full rounded-full"
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
						<div className="grow overflow-hidden truncate text-left">
							{user.name}
						</div>
					</button>
				))}
			</div>
		</div>
	);
};

export default TransferList;
