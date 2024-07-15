import type {BP} from "@/bring";
import {twJoin, type SourceType} from "@/utils";
import type {ImageType} from "@bring/blocks-client";
import {defaultImageValue} from "@bring/blocks-client";
import Image from "./image";

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

export const image = {Component: ImageBlock, componentName: "Image"};

export default ImageBlock;
