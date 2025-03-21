"use client"

import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Custom hook to get the dimensions of a DOM element.
 * @template Element - The type of the DOM element.
 * @param options - The options for the hook.
 * @param options.width - The initial width of the element (default: 0).
 * @param options.height - The initial height of the element (default: 0).
 * @returns - An object containing the element dimensions and a ref to the element.
 */
export const useElementDimensions = <Element extends HTMLElement>({ width = 0, height = 0 }) => {
	const ref = useRef<Element>(null)

	const [elementDimensions, setElementDimensions] = useState({
		width: ref.current?.clientWidth ?? 0,
		height: ref.current?.clientHeight ?? 0,
	})

	const handleResize = useCallback(
		() =>
			setElementDimensions({
				width: ref.current?.clientWidth ?? width,
				height: ref.current?.clientHeight ?? height,
			}),
		[setElementDimensions, ref, ref.current]
	)

	useEffect(() => {
		window.addEventListener("load", handleResize)
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [handleResize])

	return { elementDimensions, ref }
}
