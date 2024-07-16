import Image from "@/components/image";
import {twJoin, twMerge} from "@/utils";
import Link from "next/link";
import type {FC, ReactElement, ReactNode} from "react";
import {useMemo} from "react";
import ReactMarkdown from "react-markdown";
import supersub from "remark-supersub";

const markdownInlineElements = [
	"p",
	"a",
	"em",
	"strong",
	"sup",
	"sub",
] as const;

type MarkdownInlineElements = (typeof markdownInlineElements)[number];

export const markdownElements = [
	...markdownInlineElements,
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"img",
	"ul",
	"li",
	"ol",
	"code",
	"blockquote",
	"hr",
	"br",
] as const;

export type MarkdownElements = (typeof markdownElements)[number];

type MarkdownProps = (
	| {
			content: string;
	  }
	| {
			children: string;
	  }
) &
	(
		| {
				inline: true;
				allowedElements?: MarkdownInlineElements[];
		  }
		| {
				inline?: false;
				allowedElements?: MarkdownElements[];
		  }
	) & {
		elementsClassName?: {[key in MarkdownElements]?: string};
		className?: string;
	};

const parseAlt = (alt: string | undefined) => {
	const value = {
		alt: "",
		caption: "",
		source: "",
	};
	if (!alt) return value;

	const parts = alt.split(/--caption:|--source:/);

	value.alt = parts[0] ?? "";
	value.caption = alt.includes("--caption:") ? (parts[1] ?? "") : "";

	if (alt.includes("--source:")) {
		value.source = alt.includes("--caption:")
			? (parts[2] ?? "")
			: (parts[1] ?? "");
	}

	return value;
};

const Markdown: FC<MarkdownProps> = ({
	inline = false,
	allowedElements = inline ? markdownInlineElements : markdownElements,
	className,
	elementsClassName = {},
	...props
}) => {
	const content = "content" in props ? props.content : props.children;

	const components = useMemo(
		() => ({
			// p
			p: ({children}: {children: ReactElement<{src?: string}>}) => {
				const isImg = !!children?.props?.src as boolean;

				return inline || isImg ? (
					<>{children}</>
				) : (
					<p className={twMerge(elementsClassName.p)}>{children}</p>
				);
			},
			// inline
			a: ({children, ...props}: {children: ReactNode}) =>
				"href" in props ? (
					"title" in props ? (
						props.title === "--newTab" ? (
							<Link
								href={props.href as string}
								target="_blank"
								className={elementsClassName.a}
							>
								{children}
							</Link>
						) : (
							<Link
								href={props.href as string}
								title={props.title as string}
								className={elementsClassName.a}
							>
								{children}
							</Link>
						)
					) : (
						<Link href={props.href as string} className={elementsClassName.a}>
							{children}
						</Link>
					)
				) : (
					<Link href="">{children}</Link>
				),
			em: ({children}: {children: ReactNode}) => (
				<em className={elementsClassName.em}>{children}</em>
			),
			strong: ({children}: {children: ReactNode}) => (
				<strong className={elementsClassName.strong}>{children}</strong>
			),
			sup: ({children}: {children: ReactNode}) => (
				<sup className={elementsClassName.sup}>{children}</sup>
			),
			sub: ({children}: {children: ReactNode}) => (
				<sub className={elementsClassName.sub}>{children}</sub>
			),
			// block
			h1: ({children}: {children: ReactNode}) => (
				<h1 className={elementsClassName.h1}>{children}</h1>
			),
			h2: ({children}: {children: ReactNode}) => (
				<h2 className={elementsClassName.h2}>{children}</h2>
			),
			h3: ({children}: {children: ReactNode}) => (
				<h3 className={elementsClassName.h3}>{children}</h3>
			),
			h4: ({children}: {children: ReactNode}) => (
				<h4 className={elementsClassName.h4}>{children}</h4>
			),
			h5: ({children}: {children: ReactNode}) => (
				<h5 className={elementsClassName.h5}>{children}</h5>
			),
			h6: ({children}: {children: ReactNode}) => (
				<h6 className={elementsClassName.h6}>{children}</h6>
			),
			img: (props: {src: string; alt: string}) => {
				if (!("src" in props)) return null;
				const {alt: parsedAlt, caption, source} = parseAlt(props.alt);

				return (
					// eslint-disable-next-line jsx-a11y/alt-text
					<Image
						image={{
							src: props.src,
							alt: parsedAlt,
							width: 900,
							height: 600,
							className: elementsClassName.img,
						}}
						caption={caption}
						source={source}
						lightbox
					/>
				);
			},
			ul: ({children}: {children: ReactNode}) => (
				<ul className={elementsClassName.ul}>{children}</ul>
			),
			ol: ({children}: {children: ReactNode}) => (
				<ol className={elementsClassName.ol}>{children}</ol>
			),
			li: ({children}: {children: ReactNode}) => (
				<li className={elementsClassName.li}>{children}</li>
			),
			code: ({children}: {children: ReactNode}) => (
				<code className={elementsClassName.code}>{children}</code>
			),
			blockquote: ({children}: {children: ReactNode}) => (
				<blockquote className={elementsClassName.blockquote}>
					{children}
				</blockquote>
			),
			hr: () => <hr className={elementsClassName.hr} />,
			br: () => <br className={elementsClassName.br} />,
		}),
		[
			inline,
			elementsClassName.a,
			elementsClassName.blockquote,
			elementsClassName.br,
			elementsClassName.code,
			elementsClassName.em,
			elementsClassName.h1,
			elementsClassName.h2,
			elementsClassName.h3,
			elementsClassName.h4,
			elementsClassName.h5,
			elementsClassName.h6,
			elementsClassName.hr,
			elementsClassName.img,
			elementsClassName.li,
			elementsClassName.ol,
			elementsClassName.p,
			elementsClassName.strong,
			elementsClassName.sub,
			elementsClassName.sup,
			elementsClassName.ul,
		],
	);

	return inline ? (
		<ReactMarkdown
			remarkPlugins={[supersub]}
			allowedElements={allowedElements as string[]}
			// @ts-ignore
			components={components}
		>
			{content}
		</ReactMarkdown>
	) : (
		<ReactMarkdown
			remarkPlugins={[supersub]}
			allowedElements={allowedElements as string[]}
			//  @ts-ignore
			components={components}
			className={twJoin("md", className)}
		>
			{content}
		</ReactMarkdown>
	);
};

export default Markdown;
