import type {BP} from "@/bring";
import type {ColorType} from "@/styles/colors";
import type {ResponsiveValue} from "@bring/blocks-client/styles";
import {makeResponsiveClassNames} from "@bring/blocks-client/styles";
import {type GridNumType} from "@bring/blocks-client/types";
import clsx from "clsx";
import Row, {sizes} from "./row";

export type RowBlockProps = {
	columnCount?: ResponsiveValue<GridNumType>;
	gap?: ResponsiveValue;
	backgroundColor?: ColorType;
	size?: keyof typeof sizes;
};

const RowBlock = ({
	attributes: {columnCount = {}, gap = {}, backgroundColor, className, ...props},
	children,
}: BP<RowBlockProps>) => {
	const classNames = clsx(
		makeResponsiveClassNames("grid-cols", columnCount, {"": 1}),
		makeResponsiveClassNames("gap", gap, {"": 8}),
		"px-0",
		backgroundColor && `bg-${backgroundColor}`,
		className,
	);

	return (
		<Row className={classNames} {...props}>
			{children}
		</Row>
	);
};

export const row = {
	Block: RowBlock,
	blockName: "bring/row",
	blockStylesConfig: {
		spacing: {
			m: {
				t: {"": 0},
				b: {"": 0},
				l: {},
				r: {},
			},
			p: {
				t: {"": 6},
				b: {"": 6},
				l: {},
				r: {},
			},
		},
		visibility: {"": "grid", md: "grid", lg: "grid"},
	},
} as const;

export default Row;
