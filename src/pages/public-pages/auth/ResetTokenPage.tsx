import React from 'react';

import Header from './components/Header';

import ResetToken from '@/modules/authentication/views/ResetToken';

const ResetTokenPage: React.FC = () => {
	return (
		<div className="bg-gradient-to-br from-white to-primary-color--tint-1 min-h-screen flex flex-col">
			<Header />
			<div className="relative">
				<div className="flex justify-center items-center pt-10">
					<ResetToken />
				</div>
			</div>
		</div>
	);
};

export default ResetTokenPage;
