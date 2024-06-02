import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('@/modules/home/index'));

export const homeRoutes: RouteObject[] = [{ path: '/', element: <Home /> }];
