import ReactDOM from 'react-dom/client';
import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';

import './index.css';

import store from './store';
import { GOOGLE_CLIENT_ID } from './config';
import CssBaseline from '@mui/material/CssBaseline';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.Fragment>
		<CssBaseline />
		<Router>
			<Provider store={store}>
				<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
					<App />
				</GoogleOAuthProvider>
			</Provider>
		</Router>
	</React.Fragment>
);
