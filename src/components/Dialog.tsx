import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { AnimatePresence, motion } from 'framer-motion';

const Dialog: React.FC<{
	onClose: () => void;
	isOpen: boolean;
	style?: React.CSSProperties;
	children: React.ReactNode;
}> = ({ onClose, isOpen, style, children }) => {
	useEffect(() => {
		const closeModal = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			window.addEventListener('keydown', closeModal);
		} else {
			window.removeEventListener('keydown', closeModal);
		}
		return () => window.removeEventListener('keydown', closeModal);
	}, [isOpen]);

	return (
		<>
			{ReactDOM.createPortal(
				<AnimatePresence>
					{isOpen ? (
						<motion.div
							key="modal"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.25 }}
							className="fixed inset-0 p-6 md:px-4 md:!p-0 z-50 flex items-center justify-center"
							role="dialog"
							aria-modal="true"
						>
							<motion.div
								key="backdrop"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.25 }}
								onClick={onClose}
								className="fixed inset-0 bg-overlay-color"
								aria-hidden="true"
							/>
							<motion.div
								key="dialog"
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.25 }}
								className="relative z-10"
								style={style}
							>
								{children}
							</motion.div>
						</motion.div>
					) : (
						<></>
					)}
				</AnimatePresence>,
				document.getElementById('modal-root') as Element
			)}
		</>
	);
};

export default Dialog;
