"use client"

import MarkdownInline from "@/components/markdown/markdown-inline"
import { cn } from "@/lib/utils"
import FSLightbox from "fslightbox-react"
import NextImage, { type ImageProps as NextImageProps } from "next/image"
import NextLink from "next/link"
import { Fragment, type ReactNode, useState } from "react"

export type ImageProps = {
	image: Omit<NextImageProps, "with" | "height" | "quality"> & { width?: number; height?: number }
	link?: {
		href: string
		newTab?: boolean
	}
	lightbox?: boolean
	caption?: string
	captionClassName?: string
	source?: string
	sourceClassName?: string
} & Omit<React.HTMLProps<HTMLDivElement>, "children">

const Image = ({
	image: {
		width: imageWidth = 1200,
		height: imageHeight = 800,
		className: imageClassName,
		onClick: imageOnClick,
		...imageProps
	},
	link,
	lightbox,
	caption,
	captionClassName,
	source,
	sourceClassName,
	...props
}: ImageProps) => {
	const [lightboxOpen, setLightboxOpen] = useState(false)

	const Link =
		link && !lightbox
			? ({ children }: { children: ReactNode }) => (
					<NextLink href={link.href} target={link.newTab ? "_blank" : "_self"}>
						{children}
					</NextLink>
				)
			: Fragment

	return (
		<figure {...props}>
			<Link>
				<NextImage
					width={imageWidth}
					height={imageHeight}
					quality={100}
					className={cn("h-full w-full rounded", lightbox && "cursor-pointer", imageClassName)}
					onClick={(e) => {
						if (imageOnClick) imageOnClick(e)
						if (lightbox) setLightboxOpen((prev) => !prev)
					}}
					{...imageProps}
				/>
			</Link>

			{lightbox && (
				<FSLightbox
					toggler={lightboxOpen}
					sources={[imageProps.src as string]}
					types={["image"]}
					slide={1}
				/>
			)}

			{caption && (
				<figcaption className={cn("mt-2 px-4 text-16", captionClassName)}>
					<MarkdownInline content={caption} />
				</figcaption>
			)}

			{source && (
				<div className={cn("mt-1 px-4 text-14 italic text-opacity-70", sourceClassName)}>
					Source: <MarkdownInline content={source} />
				</div>
			)}
		</figure>
	)
}

export default Image
