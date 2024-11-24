import type {BP} from "@/bring";

export type EmbedBlockProps = {
	url?: string;
	height?: number;
};

/**
 * Embed block helps to embed content in iframe such as Google Maps or Youtube videos in the editor.
 */
const EmbedBlock = ({url, height = 400, className, id}: BP<EmbedBlockProps>) => {
	return url ? (
		<div className={className} style={{minHeight: `${height}px`}} id={id}>
			<iframe src={url} className="h-full w-full"></iframe>
		</div>
	) : null;
};

export const embed = {
	Component: EmbedBlock,
	componentName: "bring/embed",
} as const;

export default EmbedBlock;
