import {twMerge} from "@/utils";
import MarkdownInline from "../markdown/markdown-inline";
import ImageContent, {type ImageContentProps} from "./image-content";

export type ImageProps = ImageContentProps & {
	caption?: string;
	captionClassName?: string;
	source?: string;
	sourceClassName?: string;
} & React.HTMLProps<HTMLDivElement>;

const Image = ({
	image,
	link,
	lightbox,
	caption,
	captionClassName,
	source,
	sourceClassName,
	className,
	id,
	...props
}: ImageProps) => {
	const imageProps = {image, link, lightbox};

	if (!caption && !source)
		return <ImageContent {...imageProps} className={className} id={id} />;

	return (
		<figure {...props}>
			<ImageContent {...imageProps} />

			{caption && (
				<figcaption
					className={twMerge("mt-2 text-center text-neutral", captionClassName)}
				>
					<MarkdownInline content={caption} />
				</figcaption>
			)}
			{source && (
				<div
					className={twMerge(
						"mt-1 text-center text-14 italic text-neutral/70",
						sourceClassName,
					)}
				>
					Source: <MarkdownInline content={source} />
				</div>
			)}
		</figure>
	);
};

export default Image;
