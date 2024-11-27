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
	attributes: {source = "manual", content = "", align, color, className, ...props},
	entityProps,
}: BP<MarkdownBlockProps>) => {
	const classNames = clsx(align && `text-${align}`, color && `text-${color}`, className);

	if (source !== "manual") {
		if (!entityProps) {
			return null;
		}

		const dynamicContent = entityProps[source];

		return dynamicContent ? (
			<Markdown content={dynamicContent} className={classNames} {...props} />
		) : null;
	}

	return <Markdown content={content} className={classNames} {...props} />;
};

export const markdown = {
	Block: MarkdownBlock,
	blockName: "bring/markdown",
	blockStylesConfig: {
		spacing: {
			p: {
				t: {},
				b: {},
				l: {},
				r: {},
			},
			m: {
				t: {},
				b: {},
				l: {},
				r: {},
			},
		},
		visibility: {"": "block", md: "block", lg: "block"},
	},
} as const;

export default Markdown;
