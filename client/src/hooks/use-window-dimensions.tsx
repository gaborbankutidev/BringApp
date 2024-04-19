"use client";

import {useState, useEffect, useCallback} from "react";

/**
 * Custom hook that returns the dimensions of the window.
 * @returns An object containing the width and height of the window.
 */
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
