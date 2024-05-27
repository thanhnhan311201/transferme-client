import React from 'react';
import { lazy } from 'react';

import { RouteObject } from 'react-router-dom';

const Transfer = lazy(() => import('@/modules/transfer-v2/views/Transfer'));

export const transferRoutes: RouteObject[] = [
	{
		path: '/transfer',
		element: <Transfer />,
	},
];
