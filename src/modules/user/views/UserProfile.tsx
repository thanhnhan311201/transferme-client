import React from 'react';

import classNames from 'classnames';

import { IconContext } from 'react-icons';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';
import { BsCircleFill } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '@/store';
import {
	toggleDarkTheme,
	toggleLightTheme,
} from '@/modules/common/state/theme.slice';

import { THEME_PROFILE } from '@/@types/common.type';

const UserProfile: React.FC = () => {
	const { themeProfile } = useAppSelector((state) => state.theme);

	const dispatch = useAppDispatch();

	return (
		<div className="absolute bottom-0 left-0 right-0 flex flex-col items-start gap-3 bg-main-bg px-4 pb-6 before:pointer-events-none before:absolute before:bottom-full before:left-0 before:right-0 before:h-10 before:bg-gradient-to-t before:from-[#131617] before:to-[rgba(19,22,23,0)]">
			<div className="w-full shadow-[0_1.25rem_1.5rem_0_rgba(0,0,0,0.5)]">
				<div className="bg-secondary-color w-full rounded-xl p-[1.25rem]">
					<div className="flex items-center gap-4">
						<div className="relative h-10 shrink-0 basis-10">
							<img
								className="w-full rounded-full"
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
										border: '4px solid #232627',
										borderRadius: '50%',
									},
								}}
							>
								<BsCircleFill />
							</IconContext.Provider>
						</div>
						<div className="font-base flex grow flex-col items-start justify-center gap-[.375rem] overflow-hidden font-semibold">
							<div className="w-full truncate text-sm text-white">
								Phan Nguyễn Thành Nhân
							</div>
							<div className="text-white--1 w-full truncate text-xs">
								nhanpnt.dev@gmail.com
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className={classNames(
					'bg-secondary-color relative flex w-full rounded-xl p-1 before:absolute before:bottom-1 before:left-1 before:top-1 before:w-[calc(50%-0.25rem)] before:rounded-[0.625rem] before:bg-main-bg before:transition-all',
					themeProfile === THEME_PROFILE.DARK ? 'before:translate-x-full' : '',
				)}
			>
				<button
					className={classNames(
						'z-1 font-base group relative flex h-10 basis-1/2 items-center justify-center gap-3 font-semibold hover:text-white',
						themeProfile === THEME_PROFILE.LIGHT ? 'text-white' : 'text-grey',
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
						<IoSunnyOutline />
					</IconContext.Provider>
					<span className="transition-colors">Light</span>
				</button>
				<button
					className={classNames(
						'z-1 font-base group relative flex h-10 basis-1/2 items-center justify-center gap-3 font-semibold hover:text-white',
						themeProfile === THEME_PROFILE.DARK ? 'text-white' : 'text-grey',
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
