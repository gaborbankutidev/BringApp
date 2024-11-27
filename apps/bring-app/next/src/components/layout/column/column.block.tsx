import type {BP} from "@/bring";
import {type AlignType, type DirectionType, type JustifyType} from "@/editor/utils/lists";
import type {ColorType} from "@/styles/colors";
import type {ResponsiveValue} from "@bring/blocks-client/styles";
import {makeResponsiveClassNames} from "@bring/blocks-client/styles";
import type {GridNumType} from "@bring/blocks-client/types";
import clsx from "clsx";
import Column from "./column";

export type ColumnBlockProps = {
	colSpan?: ResponsiveValue<GridNumType>;
	rowSpan?: ResponsiveValue;
	gap?: ResponsiveValue;

	direction?: DirectionType;
	justify?: JustifyType;
	align?: AlignType;

	backgroundColor?: ColorType;
};

const ColumnBlock = ({
	attributes: {
		colSpan = {},
		rowSpan = {},
		gap = {},
		direction = "vertical",
		justify,
		align,
		backgroundColor,
		className,
		...props
	},
	children,
}: BP<ColumnBlockProps>) => {
	const classNames = clsx(
		makeResponsiveClassNames("col-span", colSpan, {"": 1}),
		makeResponsiveClassNames("row-span", rowSpan),
		makeResponsiveClassNames("gap", gap, {"": 4}),
		"mx-0 px-0",
		backgroundColor && `bg-${backgroundColor}`,
		direction === "vertical" && "flex-col",
		justify && `justify-${justify}`,
		align && `items-${align}`,
		className,
	);

	return (
		<Column className={classNames} {...props}>
			{children}
		</Column>
	);
};

export const column = {
	Block: ColumnBlock,
	blockName: "bring/column",
	blockStylesConfig: {
		spacing: {
			m: {
				t: {"": 0},
				b: {"": 0},
				l: {},
				r: {},
			},
			p: {
				t: {"": 0},
				b: {"": 0},
				l: {},
				r: {},
			},
		},
		visibility: {"": "flex", md: "flex", lg: "flex"},
	},
} as const;

export default Column;
