import React from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import logo from '/images/logo_4.png';

const Header = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.75 }}
			className="mx-auto flex w-full max-w-7xl items-center justify-between bg-inherit px-24 py-4"
		>
			<Link to="/" className="h-6">
				<img className="h-full" src={logo} alt="TransferMe Logo" />
			</Link>
			<nav className="flex items-center gap-8">
				<Link
					className="inline-block rounded-3xl bg-transparent px-4 py-1 text-xl text-primary-color hover:bg-white"
					to="/auth/signin"
				>
					Sign in
				</Link>
				<Link
					className="inline-block rounded-3xl border-2 border-solid border-primary-color bg-transparent px-4 py-1 text-xl text-primary-color hover:bg-white"
					to="/auth/signup"
				>
					Join now
				</Link>
			</nav>
		</motion.div>
	);
};

export default Header;
