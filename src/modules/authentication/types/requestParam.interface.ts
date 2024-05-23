// signin request param
export interface ISigninRequestParam {
	email: string;
	password: string;
}

// signup request param
export interface ISignUpRequestParam {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
}

// signin with google request param
export interface ISigninWithGoogleRequestParam {
	authCode: string;
}

export interface ISigninWithGitHubRequestParam
	extends ISigninWithGoogleRequestParam {}

export interface ISigninWithFacebookRequestParam {
	facebookId: string;
	email: string;
	username: string;
	profilePhoto: string;
}

// verify email request param
export interface IVerifyEmailRequestParam {
	email: string;
}
