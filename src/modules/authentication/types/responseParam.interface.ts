// common response param
export interface ICommonResponse {
  status: string;
  message: string;
}

// signup response param
export interface ISignupResponseParam {
  status: string;
  data: {
    user: { email: string; name: string; id: string; picture: string };
  };
}

// login response param
export interface ILoginResponseParam {
  status: string;
  data: {
    token: string;
    user: { email: string; name: string; id: string; picture: string };
  };
}

// login with google response param
export interface ILoginWithGoogleResponseParam extends ILoginResponseParam {}

// verify token response param
export interface IVerifyTokenResponseParam extends ILoginResponseParam {}

// verify email response param
export interface IVerifyEmailResponseParam extends ILoginResponseParam {}
