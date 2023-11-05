const devEnv: boolean = process.env.NODE_ENV === "development";

export const BASE_URL = devEnv
  ? "http://transferme.local.com:3000"
  : (process.env.REACT_APP_BASE_URL as string);

export const BASE_URL_API = devEnv
  ? "http://transferme.local.com:8080/api/v1"
  : (process.env.REACT_APP_BASE_URL_API as string);

export const BASE_URL_SERVER = devEnv
  ? "http://transferme.local.com:8080"
  : (process.env.REACT_APP_BASE_SERVER as string);

export {
  CLIENT_ID as GOOGLE_CLIENT_ID,
  CLIENT_SECRET as GOOGLE_CLIENT_SECRET,
  REDIRECT_URI as GOOGLE_REDIRECT_URI,
} from "./constants/google";

export { CLIENT_ID as GITHUB_CLIENT_ID } from "./constants/github";

export { type IUserInfo } from "./interface";

export const TOKEN_EXPIRATION_TIME = Number(
  process.env.REACT_APP_TOKEN_EXPIRATION_TIME as string
);
