import { useEffect, useRef } from 'react';

const useOutsideRef = (cb: () => void) => {
	const wrapperRef1 = useRef<HTMLDivElement>(null);
	const wrapperRef2 = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: any) {
			if (
				wrapperRef1.current &&
				!wrapperRef1.current.contains(event.target) &&
				wrapperRef2.current &&
				!wrapperRef2.current.contains(event.target)
			) {
				cb();
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [wrapperRef1, wrapperRef2]);

	return [wrapperRef1, wrapperRef2];
};

export default useOutsideRef;
