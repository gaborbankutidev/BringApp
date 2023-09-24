import React, {FC, useCallback} from "react";
import {useBringContext} from "../context";

export type LinkProps = {
	external?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link: FC<LinkProps> = ({
	href,
	onClick,
	external = false,
	target = "_self",
	children,
	...props
}) => {
	const {navigate} = useBringContext();

	const handleClick = useCallback(
		(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
			// call onClick prop if it exists
			onClick && onClick(event);

			// if href is not set, or target is not self, or the url is external, do nothing (fall back to default behavior)
			if (!href || !["", "_self", "_top"].includes(target) || external) {
				return;
			}

			// prevent default behavior and navigate
			event.preventDefault();
			navigate(href);
		},
		[navigate, href],
	);

	return (
		<a href={href} onClick={handleClick} target={target} {...props}>
			{children}
		</a>
	);
};
