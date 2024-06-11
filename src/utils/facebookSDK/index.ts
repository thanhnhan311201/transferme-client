import { FACEBOOK_APP_ID, FACEBOOK_SDK_VERSION } from '@/config/env';

export const initFacebookSdk = (): Promise<void> => {
	return new Promise((resolve) => {
		// Load the Facebook SDK asynchronously
		(window as any).fbAsyncInit = () => {
			(window as any).FB.init({
				appId: FACEBOOK_APP_ID,
				cookie: true,
				xfbml: true,
				autoLogAppEvents: true,
				version: 'v' + FACEBOOK_SDK_VERSION,
			});

			// Resolve the promise when SDK is loaded
			resolve();
		};

		(function (d: Document, id: string) {
			const fjs = d.getElementsByTagName('script')[0];

			if (d.getElementById(id)) return;

			const js = d.createElement('script');
			js.type = 'text/javascript';
			js.async = true;
			js.id = id;
			(js as HTMLScriptElement).src =
				'https://connect.facebook.net/en_US/sdk.js';

			if (!fjs.parentNode) return;
			fjs.parentNode.insertBefore(js, fjs);
		})(document, 'facebook-jssdk');
	});
};

export const getFacebookSigninStatus = () => {
	return new Promise((resolve) => {
		(window as any).FB.getLoginStatus((response: any) => {
			resolve(response);
		});
	});
};

export const facebookSignin = () => {
	return new Promise((resolve) => {
		(window as any).FB.login((response: any) => {
			resolve(response);
		});
	});
};
