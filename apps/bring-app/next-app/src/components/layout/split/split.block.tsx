import {cn} from "@/lib/utils";
import type {ResponsiveValue} from "@bring/blocks-client/styles";
import {makeResponsiveClassNames} from "@bring/blocks-client/styles";
import {type BP, type GridNumType} from "@bring/blocks-client/types";

export type SplitBlockProps = {
	columnCount?: ResponsiveValue<GridNumType>;
	gap?: ResponsiveValue;
};

/**
 * The split block is only used in the builder to split the content by creating a grid layout.
 */
const SplitBlock = ({
	attributes: {columnCount = {}, gap = {}, className, ...props},
	children,
}: BP<SplitBlockProps>) => {
	const classNames = cn(
		"grid px-0",
		makeResponsiveClassNames("grid-cols", columnCount, {"": 2}),
		makeResponsiveClassNames("gap", gap, {"": 8}),
		className,
	);

	return (
		<div className={classNames} {...props}>
			{children}
		</div>
	);
};

export const split = {
	Block: SplitBlock,
	blockName: "bring/split",
	blockStylesConfig: {
		spacing: {
			m: {
				t: {},
				b: {},
				l: {},
				r: {},
			},
			p: {
				t: {},
				b: {},
				l: {},
				r: {},
			},
		},
		visibility: {"": "grid", md: "grid", lg: "grid"},
	},
} as const;

export default SplitBlock;
