import {
	ACCESS_TOKEN_EXPIRATION_TIME,
	REFRESH_TOKEN_EXPIRATION_TIME,
} from '@/config';

import { getCookieValue } from '../general.util';

enum TOKEN_TYPE {
	ACCESS_TOKEN = 'access_token',
	REFRESH_TOKEN = 'refresh_token',
}

interface IJwtStorage {
	set(token: string): void;
	get(): string;
}

class CookieJwtStorage implements IJwtStorage {
	constructor(
		private tokenType: string,
		private expirationTime: number
	) {}

	set(token: string): void {
		if (!token) {
			return;
		}

		const d = new Date();
		d.setTime(d.getTime() + this.expirationTime * 60 * 60 * 1000);
		const expires = 'expires=' + d.toUTCString();
		document.cookie = `${this.tokenType}=${token}; expires=${expires}; path=/`;
	}

	delete(): void {
		document.cookie = `${this.tokenType}= ; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
	}

	get(): string {
		const token = getCookieValue(this.tokenType);
		if (!token) {
			return '';
		}

		return token;
	}
}

// class LocalStorageJwtStorage implements IJwtStorage {
// 	set(token: string): void {}

// 	get(): string {
// 		return '';
// 	}
// }

export const accessTokenStorage = new CookieJwtStorage(
	TOKEN_TYPE.ACCESS_TOKEN,
	ACCESS_TOKEN_EXPIRATION_TIME
);
export const refreshTokenStorage = new CookieJwtStorage(
	TOKEN_TYPE.REFRESH_TOKEN,
	REFRESH_TOKEN_EXPIRATION_TIME
);
