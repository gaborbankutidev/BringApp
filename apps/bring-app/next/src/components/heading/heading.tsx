import type {BP} from "@/bring";
import type {TextAlignType, TextSourceType} from "@/editor/utils/lists";
import type {ColorType} from "@/styles";
import {twJoin, twMerge} from "@/utils";
import {type FC} from "react";
import Markdown from "../markdown";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = {
	level?: HeadingLevel;
	children: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

const Heading: FC<HeadingProps> = ({
	children,
	level = 2,
	className,
	...props
}) => {
	const H = `h${level}` as const;

	return (
		<H className={twMerge("text-primary", className)} {...props}>
			<Markdown content={children} inline />
		</H>
	);
};

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

export const heading = {
	Component: HeadingBlock,
	componentName: "bring/heading",
};

export default Heading;
