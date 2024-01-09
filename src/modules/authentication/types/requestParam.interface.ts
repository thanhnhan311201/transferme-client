// login request param
export interface ILoginRequestParam {
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

// login with google request param
export interface ILoginWithGoogleRequestParam {
  authCode: string
}

// verify token request param
export interface IVerifyTokenRequestParam {
  token: string
}

// verify email request param
export interface IVerifyEmailRequestParam {
  email: string
}