import React from 'react';
import { Routes, Route, Navigate } from 'react-router';

import { transferRoutes } from './transfer/route';

import AppContainer from '@/components/AppContainer';

const PrivateRoutes: React.FC = () => {
	const privateRoutes = [...transferRoutes];

	return (
		<AppContainer>
			<Routes>
				{Array.isArray(privateRoutes) &&
					privateRoutes.map((route) => (
						<Route key={route.path} path={route.path} element={route.element} />
					))}
				<Route path="*" element={<Navigate to={'/transfer'} />} />
			</Routes>
		</AppContainer>
	);
};

export default PrivateRoutes;
