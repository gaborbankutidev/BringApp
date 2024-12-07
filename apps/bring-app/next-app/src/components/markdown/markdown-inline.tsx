import Link from "next/link"
import type { ReactElement, ReactNode } from "react"
import { useMemo } from "react"
import ReactMarkdown from "react-markdown"
import supersub from "remark-supersub"

export const markdownInlineElements = ["p", "a", "em", "strong", "sup", "sub"] as const

export type MarkdownInlineElements = (typeof markdownInlineElements)[number]

type MarkdownInlineProps = (
	| {
			content: string
	  }
	| {
			children: string
	  }
) & {
	allowedElements?: MarkdownInlineElements[]
	elementsClassName?: Partial<Record<MarkdownInlineElements, string>>
	className?: string
}

export const getInlineComponents = (
	elementsClassName: Partial<Record<MarkdownInlineElements, string>>
) => {
	return {
		// p
		p: ({ children }: { children: ReactElement<{ src?: string }> }) => <>{children}</>,
		// inline
		a: ({ children, ...props }: { children: ReactNode }) =>
			"href" in props ? (
				"title" in props ? (
					props.title === "--newTab" ? (
						<Link href={props.href as string} target="_blank" className={elementsClassName.a}>
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
		em: ({ children }: { children: ReactNode }) => (
			<em className={elementsClassName.em}>{children}</em>
		),
		strong: ({ children }: { children: ReactNode }) => (
			<strong className={elementsClassName.strong}>{children}</strong>
		),
		sup: ({ children }: { children: ReactNode }) => (
			<sup className={elementsClassName.sup}>{children}</sup>
		),
		sub: ({ children }: { children: ReactNode }) => (
			<sub className={elementsClassName.sub}>{children}</sub>
		),
	}
}

const MarkdownInline = ({
	allowedElements = [...markdownInlineElements],
	elementsClassName = {},
	...props
}: MarkdownInlineProps) => {
	const content = "content" in props ? props.content : props.children

	const components = useMemo(() => getInlineComponents(elementsClassName), [elementsClassName])

	return (
		<ReactMarkdown
			remarkPlugins={[supersub]}
			allowedElements={allowedElements as string[]}
			// @ts-ignore
			components={components}
		>
			{content}
		</ReactMarkdown>
	)
}

export default MarkdownInline
