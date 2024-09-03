import type {BP} from "@/bring";
import type {SourceType} from "@/editor/utils/lists";
import {twJoin, twMerge} from "@/utils";
import type {ImageType} from "@bring/blocks-client/types";
import {defaultImageValue} from "@bring/blocks-client/utils";
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

export const sizes = {
	"900": {width: 900, height: 600},
	"1200": {width: 1200, height: 800},
	"1800": {width: 1800, height: 1200},
	"2400": {width: 2400, height: 1600},
} as const;

export type ImageBlockProps = {
	contentSource: SourceType;
	image: ImageType;
	size?: keyof typeof sizes;
	caption?: string;
	source?: string;
	link?: string;
	newTab?: boolean;
	lightbox?: boolean;
};

const ImageBlock = ({
	contentSource = "manual",
	image = defaultImageValue,
	size = "900",
	caption,
	source,
	link = "",
	newTab = false,
	lightbox = false,

	entityProps,
	className,
	bringStylesClassNames,
	id,
}: BP<ImageBlockProps>) => {
	const img = contentSource === "dynamic" ? entityProps?.image : image;
	if (!img?.src) return null;

	const classNames = twJoin(bringStylesClassNames?.classNames, className);

	return lightbox ? (
		<Image // eslint-disable-line jsx-a11y/alt-text
			image={{
				src: img.src,
				alt: img.alt ?? "",
				width: sizes[size].width,
				height: sizes[size].height,
			}}
			lightbox
			caption={caption}
			source={source}
			className={classNames}
			id={id}
		/>
	) : (
		<Image // eslint-disable-line jsx-a11y/alt-text
			image={{
				src: img.src,
				alt: img.alt ?? "",
				width: sizes[size].width,
				height: sizes[size].height,
			}}
			caption={caption}
			source={source}
			link={
				// @ts-ignore
				link ? {href: link, target: newTab ? "_blank" : "_self"} : undefined
			}
			className={classNames}
			id={id}
		/>
	);
};

export const image = {Component: ImageBlock, componentName: "bring/image"};

export default Image;
