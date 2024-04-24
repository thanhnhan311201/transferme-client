import { isEmpty } from "lodash";

export const MAX_FILE_SIZE = 1000000000;

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const emailRegex = /^\w+([.]?\w+)*@\w+([.]?\w+)*(\.\w{2,3})+$/;

export const waitForInvoke = (cb: Function, ms: number): NodeJS.Timeout =>
  setTimeout(() => cb(), ms);

export const formatFileSize = (size: number) => {
  if (size > 1024 && size < 1000000) {
    return `${Number(size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."))
      .toFixed(2)
      .toString()} KB`;
  } else if (size > 1000000 && size < 1000000000) {
    return `${Number(size.toString().replace(/\B(?=(\d{6})+(?!\d))/g, "."))
      .toFixed(2)
      .toString()} MB`;
  } else if (size > 1000000000) {
    return `${Number(size.toString().replace(/\B(?=(\d{9})+(?!\d))/g, "."))
      .toFixed(2)
      .toString()} MB`;
  }

  return `${size} B`;
};

export const getCookieValue = (key: string) => {
  if (!key) {
    return;
  }

  const allCookies: string[] = document.cookie.split(";");
  if (isEmpty(allCookies)) {
    return;
  }

  const cookie: string | undefined = allCookies.find((cookie) =>
    cookie.trim().startsWith(key)
  );
  if (!cookie) {
    return;
  }

  const value = cookie.split("=")[1];

  return value;
};
