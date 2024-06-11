import React from 'react';

import Header from './components/Header';

import Login from '@/modules/auth/views/Login';

const LoginPage: React.FC = () => {
	return (
		<div className="flex min-h-screen flex-col bg-gradient-to-br from-white to-primary-color--tint-1">
			<Header />
			<div className="relative">
				<div className="flex items-center justify-center pt-10">
					<Login />
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
