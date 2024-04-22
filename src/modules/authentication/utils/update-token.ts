import { toast } from "react-toastify";

import {
  ACCESS_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_EXPIRATION_TIME,
} from "@/config";

export const updateCredentialTokens = (
  accessToken: string,
  refreshToken: string
) => {
  if (!accessToken || !refreshToken) {
    toast.error("Credential token is null!");
    return;
  }

  document.cookie = `access_token=${accessToken}; expires= ${new Date(
    new Date().getTime() + ACCESS_TOKEN_EXPIRATION_TIME * 60 * 60 * 1000
  ).toUTCString()}`;
  document.cookie = `refresh_token=${refreshToken}; expires= ${new Date(
    new Date().getTime() + REFRESH_TOKEN_EXPIRATION_TIME * 60 * 60 * 1000
  ).toUTCString()}`;
};
