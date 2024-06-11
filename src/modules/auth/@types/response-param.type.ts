import { CommonResponse } from '@/@types';

// signin response param
export type SigninResponseParams = CommonResponse & {
	data: {
		accessToken: string;
		refreshToken: string;
	};
};

// signup response param
export type SignupResponseParams = CommonResponse;

// signin with google response param
export type SigninWithGoogleResponseParams = SigninResponseParams;

// signin with github response param
export type SigninWithGitHubResponseParams = SigninResponseParams;

// signin with facebook response param
export type SigninWithFacebookResponseParams = SigninResponseParams;
