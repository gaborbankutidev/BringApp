import {twMerge} from "@/utils";
import {
	makeResponsiveClassNames,
	type BP,
	type GridNumType,
	type ResponsiveValue,
} from "@bring/blocks-client";
import {type ReactNode} from "react";

export type SplitProps = {
	children: ReactNode;
	columnCount?: ResponsiveValue<GridNumType>;
	gap?: ResponsiveValue;
};

const Split = ({
	children,
	columnCount = {},
	gap = {},

	bringStylesClassNames,
	className,
	id,
}: BP<SplitProps>) => {
	const classNames = twMerge(
		"grid px-0",
		makeResponsiveClassNames("grid-cols", columnCount, {"": 2}),
		makeResponsiveClassNames("gap", gap, {"": 8}),
		bringStylesClassNames?.classNames,
		className,
	);

	return (
		<div className={classNames} id={id}>
			{children}
		</div>
	);
};

export const split = {Component: Split, componentName: "Split"};

export default Split;
