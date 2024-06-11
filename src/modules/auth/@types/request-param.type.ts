// signin request param
export type SigninRequestParams = {
	email: string;
	password: string;
};

// signup request param
export type SignUpRequestParams = {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
};

// signin with google request param
export type SigninWithGoogleRequestParams = {
	authCode: string;
};

// signin with github request param
export type SigninWithGitHubRequestParams = {
	authCode: string;
};

// signin with facebook request param
export type SigninWithFacebookRequestParams = {
	facebookId: string;
	email: string;
	username: string;
	profilePhoto: string;
};

// verify email request param
export type VerifyEmailRequestParams = {
	email: string;
};
