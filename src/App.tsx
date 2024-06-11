import { useEffect } from 'react';
import React from 'react';

import PublicRoutes from './pages/public-pages/PublicRoutes';
import PrivateRoutes from './pages/private-pages/PrivateRoutes';

// import { WebSocketClient } from './network/websocket';
import { useAppSelector } from './store';

import { AUTHENTICATION_STATUS } from './modules/auth/utils';
import { useAutoSignin } from './modules/auth/hooks';

import Loading from './components/Loading';
import { initFacebookSdk } from './utils/facebookSDK';

import { LOGIN_WITH } from './utils/constants.util';
import { THEME_PROFILE } from './@types/common.type';

function App() {
	const { authStatus } = useAppSelector((state) => state.auth);
	const { themeProfile } = useAppSelector((state) => state.theme);

	const autoSignin = useAutoSignin();

	useEffect(() => {
		const loginWith = localStorage.getItem(LOGIN_WITH);
		if (loginWith !== 'github') {
			autoSignin();
		}
	}, []);

	useEffect(() => {
		if (themeProfile === THEME_PROFILE.DARK) {
			document.documentElement.setAttribute('data-theme', 'dark');
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
			document.documentElement.classList.remove('dark');
		}
	}, [themeProfile]);

	// useEffect(() => {
	//   const handleCloseTab = (e: BeforeUnloadEvent) => {
	//     WebSocketClient.getInstance().disconnect();
	//   };

	//   window.addEventListener("beforeunload", handleCloseTab);
	//   return () => {
	//     window.removeEventListener("beforeunload", handleCloseTab);
	//   };
	// }, []);

	useEffect(() => {
		initFacebookSdk();
	}, []);

	// return <PrivateRoutes />;
	switch (authStatus) {
		case AUTHENTICATION_STATUS.UNAUTHENTICATED:
			return <PublicRoutes />;
		case AUTHENTICATION_STATUS.AUTHENTICATED:
			return <PrivateRoutes />;
		case AUTHENTICATION_STATUS.AUTHENTICATING:
		default:
			return <Loading />;
	}
}

export default App;
