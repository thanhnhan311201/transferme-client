const devEnv: boolean = process.env.NODE_ENV === "development";

export const BASE_URL = devEnv
  ? "http://localhost:3000"
  : (process.env.REACT_APP_BASE_URL as string);

export const BASE_URL_API = devEnv
  ? "http://localhost:8080/api"
  : (process.env.REACT_APP_BASE_URL_API as string);

export const BASE_URL_SERVER = devEnv
  ? "http://localhost:8080"
  : (process.env.REACT_APP_BASE_SERVER as string);

export { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "./constants/google";

export { type IUserInfo } from "./interface";

export const TOKEN_EXPIRATION_TIME = Number(
  process.env.REACT_APP_TOKEN_EXPIRATION_TIME as string
);
