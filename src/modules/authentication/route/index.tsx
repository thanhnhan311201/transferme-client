import React from 'react';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Login = lazy(() => import('@/modules/authentication/views/Login'));
const Register = lazy(() => import('@/modules/authentication/views/Register'));
const ResetPass = lazy(
	() => import('@/modules/authentication/views/ResetPass')
);
const NewPass = lazy(() => import('@/modules/authentication/views/NewPass'));
const ResetToken = lazy(
	() => import('@/modules/authentication/views/ResetToken')
);
const GitHubAuth = lazy(
	() => import('@/modules/authentication/views/GitHubAuth')
);

export const authRoutes: RouteObject[] = [
	{
		path: '/auth/signin',
		element: <Login />,
	},
	{
		path: '/auth/signup',
		element: <Register />,
	},
	{
		path: '/auth/reset',
		element: <ResetPass />,
	},
	{
		path: '/auth/newpass',
		element: <NewPass />,
	},
	{
		path: '/auth/reset-token',
		element: <ResetToken />,
	},
	{
		path: '/auth/signin/github',
		element: <GitHubAuth />,
	},
];
