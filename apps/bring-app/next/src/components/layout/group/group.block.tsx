import {cn} from "@/lib/utils";
import type {ColorType} from "@/styles/colors";
import type {ResponsiveValue} from "@bring/blocks-client/styles";
import {makeResponsiveClassNames} from "@bring/blocks-client/styles";
import {type BP} from "@bring/blocks-client/types";
import type {ReactNode} from "react";

export type GroupBlockProps = {
	children: ReactNode;

	direction?: "vertical" | "horizontal";
	gap?: ResponsiveValue;
	justify?: "start" | "center" | "end" | "between";
	align?: "start" | "center" | "end";

	backgroundColor?: ColorType;
};

/**
 * The group block is only used in the builder and this is technically a variant of the ColumnBlock.
 * It is used to group elements together and apply a gap between them.
 */
const GroupBlock = ({
	children,

	direction = "vertical",
	gap = {},
	justify,
	align,
	backgroundColor,

	bringStylesClassNames,
	className,
	id,
}: BP<GroupBlockProps>) => {
	const classNames = cn(
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
	Component: GroupBlock,
	componentName: "bring/group",
} as const;

export default GroupBlock;
