import type {BP} from "@/bring";
import type {ColorType} from "@/styles";
import type {TextAlignType, TextSourceType} from "@/utils";
import {twJoin} from "@/utils";
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
	const classNames = twJoin(
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

export const heading = {Component: HeadingBlock, componentName: "Heading"};

export default HeadingBlock;
