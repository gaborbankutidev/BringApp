import type {BP} from "@/bring";

export type EmbedProps = {
	url?: string;
	height?: number;
};

const Embed = ({url, height = 400, className, id}: BP<EmbedProps>) => {
	return url ? (
		<div className={className} style={{minHeight: `${height}px`}} id={id}>
			<iframe src={url} className="h-full w-full"></iframe>
		</div>
	) : null;
};

export const embed = {Component: Embed, componentName: "Embed"};

export default Embed;
