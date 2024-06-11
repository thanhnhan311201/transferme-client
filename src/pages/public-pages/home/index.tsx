import React from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import Header from './components/Header';

import HomePageImg from '/images/home-page.png';

const HomePage: React.FC = () => {
	return (
		<div className="flex h-screen w-screen flex-col bg-gradient-to-br from-white to-primary-color--tint-2">
			<Header />
			<main className="h-auto flex-1 bg-inherit">
				<div className="flex justify-center">
					<div className="grid grid-cols-2-for-home items-center px-24 pt-16">
						<motion.div
							initial={{ opacity: 0, x: -200 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.75 }}
							className="justify-self-start"
						>
							<h1 className="mb-14 text-5xl font-bold tracking-tight text-333">
								Transfer and take your files to infinity and beyond
							</h1>
							<p className="mb-36 text-xl text-555">
								TransferMe is a simple, fast and secure way to share your data
							</p>
							<Link
								to="/auth/signin"
								className="inline-block cursor-pointer rounded-lg bg-gradient-to-br from-primary-color--tint-8 to-primary-color--shade px-8 py-4 text-xl font-medium text-white"
							>
								Start transfering
							</Link>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 200 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.75 }}
							className="w-85/100 justify-self-end"
						>
							<img
								src={HomePageImg}
								alt="Transfer file illustration"
								className="w-full"
							/>
						</motion.div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default HomePage;
