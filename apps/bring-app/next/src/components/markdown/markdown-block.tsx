import type {BP} from "@/bring";
import type {ColorType} from "@/styles";
import type {TextAlignType, TextSourceType} from "@/utils";
import {twJoin} from "@/utils";
import Markdown, {type MarkdownElements} from "./markdown";

export type MarkdownBlockProps = {
	source?: TextSourceType;
	content?: string;
	elementsClassName: {[key in MarkdownElements]?: string};
	align?: TextAlignType;
	color?: ColorType;
};

const MarkdownBlock = ({
	source = "manual",
	content = "",
	align,
	color,

	bringStylesClassNames,
	elementsClassName,
	className,
	entityProps,
}: BP<MarkdownBlockProps>) => {
	const classNames = twJoin(
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
		return dynamicContent ? (
			<Markdown content={dynamicContent} className={classNames} />
		) : null;
	}

	return (
		<Markdown
			content={content}
			className={classNames}
			elementsClassName={elementsClassName}
		/>
	);
};

export const markdown = {
	Component: MarkdownBlock,
	componentName: "Markdown",
};

export default MarkdownBlock;
