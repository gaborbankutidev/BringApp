import {cn} from "@/lib/utils";
import type {ResponsiveValue} from "@bring/blocks-client/styles";
import {makeResponsiveClassNames} from "@bring/blocks-client/styles";
import {type BP, type GridNumType} from "@bring/blocks-client/types";
import {type ReactNode} from "react";

export type SplitBlockProps = {
	children: ReactNode;
	columnCount?: ResponsiveValue<GridNumType>;
	gap?: ResponsiveValue;
};

/**
 * The split block is only used in the builder to split the content by creating a grid layout.
 */
const SplitBlock = ({
	children,
	columnCount = {},
	gap = {},

	bringStylesClassNames,
	className,
	id,
}: BP<SplitBlockProps>) => {
	const classNames = cn(
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

export const split = {
	Component: SplitBlock,
	componentName: "bring/split",
} as const;

export default SplitBlock;
