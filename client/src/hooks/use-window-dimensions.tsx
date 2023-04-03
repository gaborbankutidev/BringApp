import {useState, useEffect, useCallback} from "react";

export const useWindowDimensions = () => {
	const getWindowDimensions = useCallback(() => {
		const {innerWidth: width, innerHeight: height} = window;
		return {
			width,
			height,
		};
	}, []);

	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions(),
	);

	const handleResize = useCallback(
		() => setWindowDimensions(getWindowDimensions()),
		[setWindowDimensions],
	);

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [handleResize]);

	return windowDimensions;
};
