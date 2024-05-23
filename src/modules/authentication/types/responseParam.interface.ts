// common response param
export interface ICommonResponse {
	status: string;
}

// signup response param
export interface ISignupResponseParam extends ICommonResponse {}

// signin response param
export interface ISigninResponseParam {
	status: string;
	data: {
		accessToken: string;
		refreshToken: string;
	};
}

// signin with google response param
export interface ISigninWithGoogleResponseParam extends ISigninResponseParam {}

// signin with github response param
export interface ISigninWithGitHubResponseParam extends ISigninResponseParam {}

// signin with facebook response param
export interface ISigninWithFacebookResponseParam
	extends ISigninResponseParam {}

// verify token response param
export interface IVerifyTokenResponseParam extends ICommonResponse {}

// verify email response param
export interface IVerifyEmailResponseParam extends ISigninResponseParam {}
