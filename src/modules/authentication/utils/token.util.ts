import { toast } from "react-toastify";

import { accessTokenStorage, refreshTokenStorage } from "@/utils/JWTStorage";

export const updateCredentialTokens = (
  accessToken: string,
  refreshToken: string
) => {
  if (!accessToken || !refreshToken) {
    toast.error("Credential token is null!");
    return;
  }
  
  accessTokenStorage.set(accessToken);
  refreshTokenStorage.set(refreshToken);
};

export const removeCredentialToken = () => {
  accessTokenStorage.delete();
  refreshTokenStorage.delete();
};
