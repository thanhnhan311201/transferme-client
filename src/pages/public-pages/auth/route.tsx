import React from 'react';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const GithubAuthPage = lazy(() => import('./GitHubAuthPage'));
const LoginPage = lazy(() => import('./LoginPage'));
const NewPassPage = lazy(() => import('./NewPassPage'));
const RegisterPage = lazy(() => import('./RegisterPage'));
const ResetPassPage = lazy(() => import('./ResetPassPage'));
const ResetTokenPage = lazy(() => import('./ResetTokenPage'));

export const authRoutes: RouteObject[] = [
	{
		path: '/auth/signin',
		element: <LoginPage />,
	},
	{
		path: '/auth/signup',
		element: <RegisterPage />,
	},
	{
		path: '/auth/reset',
		element: <ResetPassPage />,
	},
	{
		path: '/auth/newpass',
		element: <NewPassPage />,
	},
	{
		path: '/auth/reset-token',
		element: <ResetTokenPage />,
	},
	{
		path: '/auth/signin/github',
		element: <GithubAuthPage />,
	},
];
