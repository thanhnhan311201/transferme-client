import React from 'react';

import Header from './components/Header';

import NewPass from '@/modules/auth/views/NewPass';

const NewPassPage: React.FC = () => {
	return (
		<div className="flex min-h-screen flex-col bg-gradient-to-br from-white to-primary-color--tint-1">
			<Header />
			<div className="relative">
				<div className="flex items-center justify-center pt-10">
					<NewPass />
				</div>
			</div>
		</div>
	);
};

export default NewPassPage;
