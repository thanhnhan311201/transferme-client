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
