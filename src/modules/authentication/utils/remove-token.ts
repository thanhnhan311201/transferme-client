export const removeCredentialToken = () => {
  document.cookie = `access_token= ; expires= ${new Date(
    new Date().getTime()
  ).toUTCString()}`;
  document.cookie = `refresh_token= ; expires= ${new Date(
    new Date().getTime()
  ).toUTCString()}`;
};
