import type {BP} from "@/bring";
import type {ColorType} from "@/styles";
import {
	makeResponsiveClassNames,
	type GridNumType,
	type ResponsiveValue,
} from "@bring/blocks-client";
import {type ReactNode} from "react";
import {twJoin} from "tailwind-merge";
import Row, {type sizes} from "./row";

export type RowBlockProps = {
	children: ReactNode;
	columnCount?: ResponsiveValue<GridNumType>;
	gap?: ResponsiveValue;
	backgroundColor?: ColorType;
	size?: keyof typeof sizes;
};

const RowBlock = ({
	children,
	columnCount = {},
	gap = {},
	backgroundColor,
	size = "1520",
	bringStylesClassNames,
	className,
	id,
}: BP<RowBlockProps>) => {
	const classNames = twJoin(
		makeResponsiveClassNames("grid-cols", columnCount, {"": 1}),
		makeResponsiveClassNames("gap", gap, {"": 8}),
		"px-0",
		bringStylesClassNames?.classNames,
		backgroundColor && `bg-${backgroundColor}`,
		className,
	);

	return (
		<Row size={size} className={classNames} id={id}>
			{children}
		</Row>
	);
};

export const row = {Component: RowBlock, componentName: "Row"};

export default RowBlock;
