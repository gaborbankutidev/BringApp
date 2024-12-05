import type {BP} from "@/bring";

export type EmbedBlockProps = {
	url?: string;
	height?: number;
};

/**
 * Embed block helps to embed content in iframe such as Google Maps or Youtube videos in the editor.
 */
const EmbedBlock = ({
	attributes: {url, height = 400, ...props},
}: BP<EmbedBlockProps>) => {
	return url ? (
		<div style={{minHeight: `${height}px`}} {...props}>
			<iframe src={url} className="h-full w-full"></iframe>
		</div>
	) : null;
};

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
} as const;

export default EmbedBlock;
