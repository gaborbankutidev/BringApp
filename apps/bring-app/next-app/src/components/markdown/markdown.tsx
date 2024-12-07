import Image from "@/components/image"
import { cn } from "@/lib/utils"
import { useMemo, type ReactElement, type ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import supersub from "remark-supersub"
import {
	getInlineComponents,
	markdownInlineElements,
	type MarkdownInlineElements,
} from "./markdown-inline"

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
] as const

export type MarkdownElements = (typeof markdownElements)[number]

type MarkdownProps = (
	| {
			content: string
	  }
	| {
			children: string
	  }
) &
	(
		| {
				inline: true
				allowedElements?: MarkdownInlineElements[]
		  }
		| {
				inline?: false
				allowedElements?: MarkdownElements[]
		  }
	) & {
		elementsClassName?: Partial<Record<MarkdownElements, string>>
		className?: string
	}

const parseAlt = (alt: string | undefined) => {
	const value = {
		alt: "",
		caption: "",
		source: "",
	}
	if (!alt) return value

	const parts = alt.split(/--caption:|--source:/)

	value.alt = parts[0] ?? ""
	value.caption = alt.includes("--caption:") ? (parts[1] ?? "") : ""

	if (alt.includes("--source:")) {
		value.source = alt.includes("--caption:") ? (parts[2] ?? "") : (parts[1] ?? "")
	}

	return value
}

const getComponents = (
	elementsClassName: Partial<Record<MarkdownElements, string>>,
	inline = false
) => {
	const { p, ...inlineComponents } = getInlineComponents(elementsClassName) // eslint-disable-line @typescript-eslint/no-unused-vars

	return {
		// p
		p: ({ children }: { children: ReactElement<{ src?: string }> }) => {
			const isImg = !!children?.props?.src

			return inline || isImg ? (
				<>{children}</>
			) : (
				<p className={cn(elementsClassName.p)}>{children}</p>
			)
		},
		// inline
		...inlineComponents,
		// block
		h1: ({ children }: { children: ReactNode }) => (
			<h1 className={elementsClassName.h1}>{children}</h1>
		),
		h2: ({ children }: { children: ReactNode }) => (
			<h2 className={elementsClassName.h2}>{children}</h2>
		),
		h3: ({ children }: { children: ReactNode }) => (
			<h3 className={elementsClassName.h3}>{children}</h3>
		),
		h4: ({ children }: { children: ReactNode }) => (
			<h4 className={elementsClassName.h4}>{children}</h4>
		),
		h5: ({ children }: { children: ReactNode }) => (
			<h5 className={elementsClassName.h5}>{children}</h5>
		),
		h6: ({ children }: { children: ReactNode }) => (
			<h6 className={elementsClassName.h6}>{children}</h6>
		),
		img: (props: { src: string; alt: string }) => {
			if (!("src" in props)) return null
			const { alt: parsedAlt, caption, source } = parseAlt(props.alt)

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
			)
		},
		ul: ({ children }: { children: ReactNode }) => (
			<ul className={elementsClassName.ul}>{children}</ul>
		),
		ol: ({ children }: { children: ReactNode }) => (
			<ol className={elementsClassName.ol}>{children}</ol>
		),
		li: ({ children }: { children: ReactNode }) => (
			<li className={elementsClassName.li}>{children}</li>
		),
		code: ({ children }: { children: ReactNode }) => (
			<code className={elementsClassName.code}>{children}</code>
		),
		blockquote: ({ children }: { children: ReactNode }) => (
			<blockquote className={elementsClassName.blockquote}>{children}</blockquote>
		),
		hr: () => <hr className={elementsClassName.hr} />,
		br: () => <br className={elementsClassName.br} />,
	}
}

const Markdown = ({
	inline = false,
	allowedElements = inline ? [...markdownInlineElements] : [...markdownElements],
	className,
	elementsClassName = {},
	...props
}: MarkdownProps) => {
	const content = "content" in props ? props.content : props.children

	const components = useMemo(
		() => getComponents(elementsClassName, inline),
		[elementsClassName, inline]
	)

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
			className={cn("md", className)}
		>
			{content}
		</ReactMarkdown>
	)
}

export default Markdown
