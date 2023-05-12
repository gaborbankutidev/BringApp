import React, {useCallback} from "react";
import {useBringContext} from "../context";
import {FCC} from "../types";

type LinkProps = {
	external?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link: FCC<LinkProps> = ({
	href,
	onClick,
	external = false,
	target,
	children,
	...props
}) => {
	const {navigate} = useBringContext();

	const handleClick = useCallback(
		(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
			if (!href) {
				return;
			}

			event.preventDefault();
			onClick && onClick(event);

			target === "_blank" && window.open(href, "_blank");

			external ? (window.location.href = href) : navigate(href);
		},
		[navigate, href],
	);

	return (
		<a href={href} onClick={handleClick} target={target} {...props}>
			{children}
		</a>
	);
};
