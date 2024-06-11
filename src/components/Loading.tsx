import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import classNames from 'classnames';
import { CommonProps } from '@/@types/common.type';
import type { ElementType, ReactNode } from 'react';

interface BaseLoadingProps extends CommonProps {
	asElement?: ElementType;
	customLoader?: ReactNode;
	loading: boolean;
}

interface LoadingProps extends BaseLoadingProps {
	type?: 'default' | 'cover';
}

const DefaultLoading = (props: BaseLoadingProps) => {
	const {
		loading,
		children,
		className,
		asElement: Component = 'div',
		customLoader,
	} = props;

	return loading ? (
		<Component
			className={classNames(
				!customLoader && 'flex h-full items-center justify-center',
				className,
			)}
		>
			{customLoader ? <>{customLoader}</> : <CircularProgress />}
		</Component>
	) : (
		<>{children}</>
	);
};

const CoveredLoading = (props: BaseLoadingProps) => {
	const {
		loading,
		children,
		className,
		asElement: Component = 'div',
		customLoader,
	} = props;

	return (
		<Component className={classNames(loading ? 'relative' : '', className)}>
			{children}
			{loading && (
				<div className="absolute inset-0 h-full w-full bg-white bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-60" />
			)}
			{loading && (
				<div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
					{customLoader ? <>{customLoader}</> : <CircularProgress />}
				</div>
			)}
		</Component>
	);
};

const Loading = ({ type, ...rest }: LoadingProps) => {
	switch (type) {
		case 'default':
			return <DefaultLoading {...rest} />;
		case 'cover':
			return <CoveredLoading {...rest} />;
		default:
			return <DefaultLoading {...rest} />;
	}
};

Loading.defaultProps = {
	loading: false,
	type: 'default',
	asElement: 'div',
};

export default Loading;
