export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const emailRegex = /^\w+([.]?\w+)*@\w+([.]?\w+)*(\.\w{2,3})+$/;

export const waitForInvoke = (cb: Function, ms: number): NodeJS.Timeout =>
  setTimeout(() => cb(), ms);


