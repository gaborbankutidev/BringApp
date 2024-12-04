import type {BP} from "@/bring";
import type {TextAlignType, TextSourceType} from "@/editor/utils/lists";
import {cn} from "@/lib/utils";
import type {ColorType} from "@/styles/colors";
import Heading, {type HeadingLevel} from "./heading";

export type HeadingBlockProps = {
	source?: TextSourceType;
	title: string;
	level?: HeadingLevel;
	align?: TextAlignType;
	color?: ColorType;
};

const HeadingBlock = ({
	attributes: {source = "manual", title, align, color, className, ...props},
	entityProps,
}: BP<HeadingBlockProps>) => {
	const classNames = cn(
		align && `text-${align}`,
		color && `text-${color}`,
		className,
	);

	let headingTitle: string | null = title;
	if (source !== "manual") {
		if (!entityProps) return null;

		headingTitle = entityProps[source];
	}

	return headingTitle !== null ? (
		<Heading className={classNames} {...props}>
			{headingTitle}
		</Heading>
	) : null;
};

export const heading = {
	Block: HeadingBlock,
	blockName: "bring/heading",
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
		visibility: {"": "block", md: "block", lg: "block"},
	},
} as const;

export default HeadingBlock;
