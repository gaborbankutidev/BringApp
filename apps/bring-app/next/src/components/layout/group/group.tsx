import type {ColorType} from "@/styles";
import {twMerge} from "@/utils";
import {
	makeResponsiveClassNames,
	type BP,
	type ResponsiveValue,
} from "@bring/blocks-client";
import type {ReactNode} from "react";

export type GroupProps = {
	children: ReactNode;

	direction?: "vertical" | "horizontal";
	gap?: ResponsiveValue;
	justify?: "start" | "center" | "end" | "between";
	align?: "start" | "center" | "end";

	backgroundColor?: ColorType;
};

const Group = ({
	children,

	direction = "vertical",
	gap = {},
	justify,
	align,
	backgroundColor,

	bringStylesClassNames,
	className,
	id,
}: BP<GroupProps>) => {
	const classNames = twMerge(
		makeResponsiveClassNames("gap", gap, {"": 4}),
		backgroundColor && `bg-${backgroundColor}`,
		direction === "vertical" ? "flex flex-col" : "flex flex-row",
		justify && `justify-${justify}`,
		align && `items-${align}`,
		bringStylesClassNames?.classNames,
		className,
	);

	return (
		<div className={classNames} id={id}>
			{children}
		</div>
	);
};

export const group = {
	Component: Group,
	componentName: "Group",
};

export default Group;
