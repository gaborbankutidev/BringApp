import type {BP} from "@/bring";
import type {ColorType} from "@/styles";
import {twMerge} from "@/utils";
import type {ResponsiveValue} from "@bring/blocks-client/styles";
import {makeResponsiveClassNames} from "@bring/blocks-client/styles";
import {type GridNumType} from "@bring/blocks-client/types";
import {type ReactNode} from "react";
import {twJoin} from "tailwind-merge";

export type RowProps = {
	size?: keyof typeof sizes;
} & Omit<React.HTMLProps<HTMLDivElement>, "size">;

export const sizes = {
	"720": "mx-4 md:mx-8 max-w-[720px] min-[784px]:mx-auto",
	"1040": "mx-4 md:mx-8 max-w-[1040px] min-[1080px]:mx-auto",
	"1200": "mx-4 md:mx-8 lg:mx-10 max-w-[1200px] min-[1280px]:mx-auto",
	"1520": "mx-4 md:mx-8 lg:mx-10 max-w-[1520px] min-[1600px]:mx-auto",
	wide: "mx-4 md:mx-8 lg:mx-10",
	full: "mx-0",
} as const;

const Row = ({children, size = "1520", className, ...props}: RowProps) => {
	const classNames = twMerge("grid gap-8 px-0", sizes[size], className);

	return (
		<div className={classNames} {...props}>
			{children}
		</div>
	);
};

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

export const row = {Component: RowBlock, componentName: "bring/row"} as const;

export default Row;
