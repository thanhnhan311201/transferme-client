import React from 'react';
import { Routes, Route, Navigate } from 'react-router';

import { transferRoutes } from '@/modules/transfer-v2/route';

import AppContainer from '@/components/AppContainer';

const ProtectedRoutes: React.FC = () => {
	const protectedRoutes = [...transferRoutes];

	return (
		<AppContainer>
			<Routes>
				{Array.isArray(protectedRoutes) &&
					protectedRoutes.map((route) => (
						<Route key={route.path} path={route.path} element={route.element} />
					))}
				<Route path="*" element={<Navigate to={'/transfer'} />} />
			</Routes>
		</AppContainer>
	);
};

export default ProtectedRoutes;
