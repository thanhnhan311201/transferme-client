export interface CommonProps {
	className?: string;
	children?: React.ReactNode;
	style?: React.CSSProperties;
}

export enum PROMISE_STATUS {
	PENDING = 'pending',
	FULFILLED = 'fulfilled',
	REJECTED = 'rejected',
}

export enum THEME_PROFILE {
	LIGHT = 'light',
	DARK = 'dark',
}
