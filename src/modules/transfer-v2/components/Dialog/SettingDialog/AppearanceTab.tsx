import React from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';

import { useAppSelector, useAppDispatch } from '@/store';
import {
	toggleDarkTheme,
	toggleLightTheme,
} from '@/modules/common/state/theme.slice';

import { THEME_PROFILE } from '@/types/common.type';

const AppearanceTab: React.FC = () => {
	const { themeProfile } = useAppSelector((state) => state.theme);

	const dispatch = useAppDispatch();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="w-full h-full flex flex-col justify-start gap-8"
		>
			<div className="shrink-0 font-['Inter'] text-3xl font-bold tracking-tight text-main-text-color">
				Appearance
			</div>
			<div className="grow flex flex-col justify-start gap-5">
				<div className="shrink-0 font-['Inter'] text-base font-semibold text-main-text-color">
					Appearance
				</div>
				<div className="grow flex flex-col justify-start">
					<div className="flex items-start justify-start gap-8 pr-12">
						<button
							className={classNames(
								'basis-1/2 p-3 border-4 rounded-2xl text-left transition-colors font-base font-semibold',
								themeProfile === THEME_PROFILE.LIGHT
									? 'bg-transparent border-border-btn-color-selected text-setting-dialog__appearance__btn-text-selected-color'
									: 'bg-setting-dialog__btn-hover-color border-transparent text-setting-dialog__appearance__btn-text-color'
							)}
							onClick={() => dispatch(toggleLightTheme())}
						>
							<div className="w-full h-full flex flex-col justify-start gap-3">
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
								'basis-1/2 p-3 border-4 rounded-2xl text-left transition-colors',
								themeProfile === THEME_PROFILE.DARK
									? 'bg-transparent border-border-btn-color-selected text-setting-dialog__appearance__btn-text-selected-color'
									: 'bg-setting-dialog__btn-hover-color border-transparent text-setting-dialog__appearance__btn-text-color'
							)}
							onClick={() => dispatch(toggleDarkTheme())}
						>
							<div className="w-full h-full flex flex-col justify-start gap-3">
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
