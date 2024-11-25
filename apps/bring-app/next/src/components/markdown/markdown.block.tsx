import type {BP} from "@/bring";
import type {TextAlignType, TextSourceType} from "@/editor/utils/lists";
import type {ColorType} from "@/styles/colors";
import clsx from "clsx";
import Markdown, {type MarkdownElements} from "./markdown";

export type MarkdownBlockProps = {
	source?: TextSourceType;
	content?: string;
	elementsClassName: {[key in MarkdownElements]?: string};
	align?: TextAlignType;
	color?: ColorType;
};

export const MarkdownBlock = ({
	source = "manual",
	content = "",
	align,
	color,

	bringStylesClassNames,
	elementsClassName,
	className,
	entityProps,
}: BP<MarkdownBlockProps>) => {
	console.log(source);
	const classNames = clsx(
		align && `text-${align}`,
		color && `text-${color}`,
		bringStylesClassNames?.classNames,
		className,
	);

	if (source !== "manual") {
		if (!entityProps) {
			return null;
		}

		const dynamicContent = entityProps[source];

		return dynamicContent ? <Markdown content={dynamicContent} className={classNames} /> : null;
	}

	return (
		<Markdown content={content} className={classNames} elementsClassName={elementsClassName} />
	);
};

export const markdown = {
	Component: MarkdownBlock,
	componentName: "bring/markdown",
} as const;

export default Markdown;
