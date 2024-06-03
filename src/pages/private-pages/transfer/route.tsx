import React from 'react';
import { lazy } from 'react';

import { RouteObject } from 'react-router-dom';

const TransferPage = lazy(() => import('.'));

export const transferRoutes: RouteObject[] = [
	{
		path: '/transfer',
		element: <TransferPage />,
	},
];
