interface IJwtStorage {
  set(token: string): void;
  get(): string;
}

export class CookieJwtStorage implements IJwtStorage {
  set(token: string): void {}

  get(): string {
    return "";
  }
}

export class LocalStorageJwtStorage implements IJwtStorage {
  set(token: string): void {}

  get(): string {
    return "";
  }
}
