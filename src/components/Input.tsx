import React from 'react';

import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: JSX.Element;
	helperText?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { icon, className, helperText, ...inputProps } = props;

	return (
		<div>
			<div className="relative">
				<input
					ref={ref}
					className={classNames(
						className,
						'w-full h-[3.25rem] px-4 font-base text-main-text-color transition-colors font-medium',
						icon ? 'pl-[3.125rem] pr-3.5' : ''
					)}
					{...inputProps}
				/>
				{icon && (
					<div className="inline-block w-6 h-6 absolute top-2/4 -translate-y-2/4 left-4 pointer-events-none transition-colors">
						{icon}
					</div>
				)}
			</div>
			<AnimatePresence>
				{helperText && (
					<motion.div
						key="helper-text"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						className="mt-2 font-base"
					>
						{helperText}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
});

Input.displayName = 'Input';
export default Input;
