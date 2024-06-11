import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { homeRoutes } from './home/route';
import { authRoutes } from './auth/route';

import AppContainer from '@/components/AppContainer';

const PublicRoutes: React.FC = () => {
	const publicRoutes = [...homeRoutes, ...authRoutes];

	return (
		<AppContainer>
			<Routes>
				{Array.isArray(publicRoutes) &&
					publicRoutes.map((route) => (
						<Route key={route.path} path={route.path} element={route.element} />
					))}
				<Route path="*" element={<Navigate to={'/'} />} />
			</Routes>
		</AppContainer>
	);
};

export default PublicRoutes;
