import type {BP} from "@/bring";
import {type AlignType, type DirectionType, type JustifyType} from "@/editor/utils/lists";
import {cn} from "@/lib/utils";
import type {ColorType} from "@/styles/colors";
import type {ResponsiveValue} from "@bring/blocks-client/styles";
import {makeResponsiveClassNames} from "@bring/blocks-client/styles";
import type {GridNumType} from "@bring/blocks-client/types";
import type {ReactNode} from "react";
import Column from "./column";

export type ColumnProps = {
	children?: ReactNode;
	className?: string;
} & React.HTMLProps<HTMLDivElement>;

export type ColumnBlockProps = {
	children: ReactNode;

	colSpan?: ResponsiveValue<GridNumType>;
	rowSpan?: ResponsiveValue;
	gap?: ResponsiveValue;

	direction?: DirectionType;
	justify?: JustifyType;
	align?: AlignType;

	backgroundColor?: ColorType;
};

const ColumnBlock = ({
	children,

	colSpan = {},
	rowSpan = {},
	gap = {},

	direction = "vertical",
	justify,
	align,

	backgroundColor,

	bringStylesClassNames,
	className,
	id,
}: BP<ColumnBlockProps>) => {
	const classNames = cn(
		makeResponsiveClassNames("col-span", colSpan, {"": 1}),
		makeResponsiveClassNames("row-span", rowSpan),
		makeResponsiveClassNames("gap", gap, {"": 4}),
		"mx-0 px-0",
		backgroundColor && `bg-${backgroundColor}`,
		direction === "vertical" && "flex-col",
		justify && `justify-${justify}`,
		align && `items-${align}`,
		bringStylesClassNames?.classNames,
		className,
	);

	return (
		<Column className={classNames} id={id}>
			{children}
		</Column>
	);
};

export const column = {
	Component: ColumnBlock,
	componentName: "bring/column",
} as const;

export default Column;
