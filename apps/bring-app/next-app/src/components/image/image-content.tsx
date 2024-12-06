"use client";

import {cn} from "@/lib/utils";
import FSLightbox from "fslightbox-react";
import NextImage, {type ImageProps as NextImageProps} from "next/image";
import Link, {type LinkProps} from "next/link";
import {useState} from "react";

export type ImageContentProps = {
	image: NextImageProps;
	link?: LinkProps;
	lightbox?: boolean;
	className?: string;
	id?: string;
};

const imageBaseStyle = "rounded w-full";

const ImageContent = ({
	image,
	link,
	lightbox,
	className,
	id,
}: ImageContentProps) => {
	const [lightboxController, setLightboxController] = useState({
		toggler: false,
		slide: 1,
	});

	const {onClick, className: imageClassName, ...imageProps} = image;

	return link ? (
		<Link {...link} className={className} id={id}>
			<NextImage
				{...imageProps}
				className={cn(imageBaseStyle, className)}
				onClick={onClick}
				quality={100}
			/>
		</Link>
	) : (
		<>
			<NextImage
				{...imageProps}
				className={cn(
					imageBaseStyle,
					lightbox && "cursor-pointer",
					imageClassName,
					className,
				)}
				id={id}
				onClick={(e) => {
					onClick && onClick(e);
					lightbox &&
						setLightboxController({
							toggler: !lightboxController.toggler,
							slide: 1,
						});
				}}
				quality={100}
			/>
			{lightbox && (
				<FSLightbox
					toggler={lightboxController.toggler}
					sources={[imageProps.src as string]}
					types={["image"]}
					slide={lightboxController.slide}
				/>
			)}
		</>
	);
};

export default ImageContent;
