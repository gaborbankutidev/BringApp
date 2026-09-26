import type { BP } from "@/bring/types"

export type EmbedBlockProps = {
	url?: string
	height?: number
}

/**
 * The url attribute is editor-controlled free text; only https URLs may reach the
 * iframe src — a `javascript:` src would execute in the embedding page's origin.
 */
const toSafeEmbedUrl = (url: string): string | null => {
	try {
		const parsed = new URL(url.trim())
		return parsed.protocol === "https:" ? parsed.href : null
	} catch {
		return null
	}
}

/**
 * Embed block helps to embed content in iframe such as Google Maps or Youtube videos in the editor.
 */
const EmbedBlock = ({ attributes: { url, height = 400, ...props } }: BP<EmbedBlockProps>) => {
	const safeUrl = url ? toSafeEmbedUrl(url) : null
	return safeUrl ? (
		<div style={{ minHeight: `${height}px` }} {...props}>
			<iframe
				src={safeUrl}
				className="w-full"
				style={{ minHeight: `${height}px` }}
				sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
				referrerPolicy="no-referrer"
			></iframe>
		</div>
	) : null
}

export const embed = {
	Block: EmbedBlock,
	blockName: "bring/embed",
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
		visibility: { "": "block", md: "block", lg: "block" },
	},
} as const

export default EmbedBlock
