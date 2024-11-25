import type {BP} from "@/bring";
import {cn} from "@/lib/utils";
import type {ColorType} from "@/styles/colors";
import type {ResponsiveValue} from "@bring/blocks-client/styles";
import {makeResponsiveClassNames} from "@bring/blocks-client/styles";
import {type GridNumType} from "@bring/blocks-client/types";
import {type ReactNode} from "react";
import Row, {sizes} from "./row";

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
	const classNames = cn(
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

export const row = {Component: RowBlock, componentName: "bring/row"} as const;

export default Row;
