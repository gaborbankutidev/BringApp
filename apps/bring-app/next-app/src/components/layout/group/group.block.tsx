
import {cn} from "@/lib/utils";
import type {ColorType} from "@/styles/colors";
import type {ResponsiveValue} from "@bring/blocks-client/styles";
import {makeResponsiveClassNames} from "@bring/blocks-client/styles";
import {type BP} from "@bring/blocks-client/types";

export type GroupBlockProps = {
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
	attributes: {
		direction = "vertical",
		gap = {},
		justify,
		align,
		backgroundColor,
		className,
		...props
	},
	children,
}: BP<GroupBlockProps>) => {
	const classNames = cn(
		makeResponsiveClassNames("gap", gap, {"": 4}),
		backgroundColor && `bg-${backgroundColor}`,
		direction === "vertical" ? "flex flex-col" : "flex flex-row",
		justify && `justify-${justify}`,
		align && `items-${align}`,
		className,
	);

	return (
		<div className={classNames} {...props}>
			{children}
		</div>
	);
};

export const group = {
	Block: GroupBlock,
	blockName: "bring/group",
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
		visibility: { "": "flex", md: "flex", lg: "flex" },
	},

} as const;

export default GroupBlock;
