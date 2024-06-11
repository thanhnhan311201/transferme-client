import React from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';

import { useAppSelector, useAppDispatch } from '@/store';
import {
	toggleDarkTheme,
	toggleLightTheme,
} from '@/modules/common/state/theme.slice';

import { THEME_PROFILE } from '@/@types/common.type';

const AppearanceTab: React.FC = () => {
	const { themeProfile } = useAppSelector((state) => state.theme);

	const dispatch = useAppDispatch();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="flex h-full w-full flex-col justify-start gap-8"
		>
			<div className="text-main-text-color shrink-0 font-['Inter'] text-3xl font-bold tracking-tight">
				Appearance
			</div>
			<div className="flex grow flex-col justify-start gap-8">
				<div className="flex flex-col justify-start gap-5">
					<div className="text-main-text-color shrink-0 font-['Inter'] text-base font-semibold">
						Appearance
					</div>
					<div className="flex items-start justify-start gap-8 pr-12">
						<button
							className={classNames(
								'font-base basis-1/2 rounded-2xl border-4 p-3 text-left font-semibold transition-colors',
								themeProfile === THEME_PROFILE.LIGHT
									? 'border-border-btn-color-selected text-setting-dialog__appearance__btn-text-selected-color bg-transparent'
									: 'bg-setting-dialog__btn-hover-color text-setting-dialog__appearance__btn-text-color border-transparent',
							)}
							onClick={() => dispatch(toggleLightTheme())}
						>
							<div className="flex h-full w-full flex-col justify-start gap-3">
								<img
									src="/images/theme-light.svg"
									alt="theme-light"
									decoding="async"
									loading="lazy"
									className="w-full rounded-xl"
									width={120}
									height={80}
								/>
								<span>Light mode</span>
							</div>
						</button>
						<button
							className={classNames(
								'basis-1/2 rounded-2xl border-4 p-3 text-left transition-colors',
								themeProfile === THEME_PROFILE.DARK
									? 'border-border-btn-color-selected text-setting-dialog__appearance__btn-text-selected-color bg-transparent'
									: 'bg-setting-dialog__btn-hover-color text-setting-dialog__appearance__btn-text-color border-transparent',
							)}
							onClick={() => dispatch(toggleDarkTheme())}
						>
							<div className="flex h-full w-full flex-col justify-start gap-3">
								<img
									src="/images/theme-dark.svg"
									alt="dark-light"
									decoding="async"
									loading="lazy"
									className="w-full rounded-xl"
									width={120}
									height={80}
								/>
								<span>Dark mode</span>
							</div>
						</button>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default AppearanceTab;
