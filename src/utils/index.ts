export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const emailRegex = /^\w+([.]?\w+)*@\w+([.]?\w+)*(\.\w{2,3})+$/;
