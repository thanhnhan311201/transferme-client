import React from 'react';

import classNames from 'classnames';

import { IconContext } from 'react-icons';
import { MdSunny } from 'react-icons/md';
import { IoMoonOutline } from 'react-icons/io5';

import { useAppDispatch, useAppSelector } from '@/store';

import { THEME_PROFILE } from '@/types/common.type';
import {
	toggleDarkTheme,
	toggleLightTheme,
} from '@/modules/common/state/theme.slice';
import { BsCircleFill } from 'react-icons/bs';

const UserProfile: React.FC = () => {
	const { themeProfile } = useAppSelector((state) => state.theme);

	const dispatch = useAppDispatch();

	return (
		<div className="absolute bottom-0 left-0 right-0 px-4 pb-6 bg-main-bg before:absolute before:left-0 before:right-0 before:bottom-full before:h-10 before:bg-gradient-to-t before:from-[#131617] before:to-[rgba(19,22,23,0)] before:pointer-events-none flex flex-col gap-3 items-start">
			<div className="shadow-[0_1.25rem_1.5rem_0_rgba(0,0,0,0.5)] w-full">
				<div className="p-[1.25rem] rounded-xl bg-secondary-color w-full">
					<div className="flex items-center gap-4">
						<div className="relative basis-10 h-10">
							<img
								className="rounded-full w-full"
								src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-1/437918699_3781431168759185_919186230840647234_n.jpg?stp=dst-jpg_p200x200&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YSAu2Ddpc6EQ7kNvgGePJYH&_nc_ht=scontent.fsgn5-9.fna&oh=00_AYAYOTLa2mjWjOH_la28r0CrNkXqLXjqpZX63E8CoOlTOA&oe=665D2BFF"
								alt="User avatar"
								referrerPolicy="no-referrer"
								crossOrigin="anonymous"
							/>
							<IconContext.Provider
								value={{
									style: {
										position: 'absolute',
										width: '1.125rem',
										height: '1.125rem',
										color: '#46ab5e',
										bottom: -2,
										right: -2,
										zIndex: 2,
										border: '4px solid #232627',
										borderRadius: '50%',
									},
								}}
							>
								<BsCircleFill />
							</IconContext.Provider>
						</div>
						<div className="flex flex-col items-start justify-center gap-[.375rem] font-semibold font-['Inter'] truncate grow">
							<div className="text-sm text-white">Phan Nguyễn Thành Nhân</div>
							<div className="text-xs text-white--1">nhanpnt.dev@gmail.com</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className={classNames(
					'relative flex w-full p-1 bg-secondary-color rounded-xl before:absolute before:left-1 before:top-1 before:bottom-1 before:w-[calc(50%-0.25rem)] before:bg-main-bg before:rounded-[0.625rem] before:transition-all',
					themeProfile === THEME_PROFILE.DARK ? 'before:translate-x-full' : ''
				)}
			>
				<button
					className={classNames(
						"relative z-1 group flex justify-center items-center gap-3 font-['Inter'] h-10 basis-1/2 text-sm font-semibold hover:text-white",
						themeProfile === THEME_PROFILE.LIGHT ? 'text-white' : 'text-grey'
					)}
					onClick={() => dispatch(toggleLightTheme())}
				>
					<IconContext.Provider
						value={{
							className: 'transition-colors',
							style: {
								verticalAlign: 'middle',
								width: '1.5rem',
								height: '1.5rem',
								fill:
									themeProfile === THEME_PROFILE.LIGHT
										? 'rgba(254, 254, 254)'
										: 'rgba(108, 114, 117)',
							},
						}}
					>
						<MdSunny />
					</IconContext.Provider>
					<span className="transition-colors">Light</span>
				</button>
				<button
					className={classNames(
						"relative z-1 group flex justify-center items-center gap-3 font-['Inter'] h-10 basis-1/2 text-sm font-semibold hover:text-white",
						themeProfile === THEME_PROFILE.DARK ? 'text-white' : 'text-grey'
					)}
					onClick={() => dispatch(toggleDarkTheme())}
				>
					<IconContext.Provider
						value={{
							className: 'transition-colors',
							style: {
								verticalAlign: 'middle',
								width: '1.5rem',
								height: '1.5rem',
								fill:
									themeProfile === THEME_PROFILE.DARK
										? 'rgba(254, 254, 254)'
										: 'rgba(108, 114, 117)',
							},
						}}
					>
						<IoMoonOutline />
					</IconContext.Provider>
					<span className="transition-colors">Dark</span>
				</button>
			</div>
		</div>
	);
};

export default UserProfile;
