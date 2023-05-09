import {useState, useEffect, useRef, useCallback} from "react";

export const useElementDimensions = <Element extends HTMLElement>({
	width = 0,
	height = 0,
}) => {
	const ref = useRef<Element>(null);

	const [elementDimensions, setElementDimensions] = useState({
		width: ref.current?.clientWidth ?? 0,
		height: ref.current?.clientHeight ?? 0,
	});

	const handleResize = useCallback(
		() =>
			setElementDimensions({
				width: ref.current?.clientWidth ?? width,
				height: ref.current?.clientHeight ?? height,
			}),
		[setElementDimensions, ref, ref.current],
	);

	useEffect(() => {
		window.addEventListener("load", handleResize);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [handleResize]);

	return {elementDimensions, ref};
};
