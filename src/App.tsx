import { useEffect } from 'react';
import React from 'react';

import PublicRoutes from './routes/PublicRoutes';
import ProtectedRoutes from './routes/ProtectedRoutes';

// import socketClient from "./socket";
import { useAppSelector } from './store';

import { AUTHENTICATION_STATUS } from './modules/authentication/utils';
import { useAutoSignin } from './modules/authentication/hooks';

import Loading from './components/Loading';
import { initFacebookSdk } from './utils/facebookSDK';

import { LOGIN_WITH } from './utils/constants.util';

function App() {
	const { authStatus } = useAppSelector((state) => state.auth);

	const autoSignin = useAutoSignin();

	useEffect(() => {
		const loginWith = localStorage.getItem(LOGIN_WITH);
		if (loginWith !== 'github') {
			autoSignin();
		}
	}, []);

	// useEffect(() => {
	//   const handleCloseTab = (e: BeforeUnloadEvent) => {
	//     socketClient.disconnect();
	//   };

	//   window.addEventListener("beforeunload", handleCloseTab);
	//   return () => {
	//     window.removeEventListener("beforeunload", handleCloseTab);
	//   };
	// }, []);

	useEffect(() => {
		initFacebookSdk();
	}, []);

	return <ProtectedRoutes />;
	// switch (authStatus) {
	// 	case AUTHENTICATION_STATUS.UNAUTHENTICATED:
	// 		return <PublicRoutes />;
	// 	case AUTHENTICATION_STATUS.AUTHENTICATED:
	// 		return <ProtectedRoutes />;
	// 	case AUTHENTICATION_STATUS.AUTHENTICATING:
	// 	default:
	// 		return <Loading />;
	// }
}

export default App;
