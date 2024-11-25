import type {BP} from "@/bring";
import type {TextAlignType, TextSourceType} from "@/editor/utils/lists";
import type {ColorType} from "@/styles/colors";
import clsx from "clsx";
import Heading, {type HeadingLevel} from "./heading";

export type HeadingBlockProps = {
	source?: TextSourceType;
	title: string;
	level?: HeadingLevel;
	align?: TextAlignType;
	color?: ColorType;
};

const HeadingBlock = ({
	source = "manual",
	title,
	level = 2,
	align,
	color,

	entityProps,
	bringStylesClassNames,
	className,
	id,
}: BP<HeadingBlockProps>) => {
	const classNames = clsx(
		align && `text-${align}`,
		color && `text-${color}`,
		bringStylesClassNames?.classNames,
		className,
	);

	let headingTitle: string | null = title;
	if (source !== "manual") {
		if (!entityProps) return null;

		headingTitle = entityProps[source];
	}

	return headingTitle !== null ? (
		<Heading level={level} className={classNames} id={id}>
			{headingTitle}
		</Heading>
	) : null;
};

export const heading = {
	Component: HeadingBlock,
	componentName: "bring/heading",
} as const;

export default HeadingBlock;
