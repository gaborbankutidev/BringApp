import { type BP } from "@/bring/types"
import type { ImageType, MediaType } from "@bring/blocks-client"
import MediaAndArrays from "./media-and-arrays"

export type GalleryWithCaptionItemType = {
	image: ImageType
	caption?: string
}

export type MediaAndArraysBlockProps = {
	image: ImageType
	file: MediaType
	list?: string[]
	gallery?: ImageType[]
	galleryWithCaption?: GalleryWithCaptionItemType[]
}

const MediaAndArraysBlock = ({
	attributes: {
		image,
		file,
		list = [],
		gallery: _gallery = [],
		galleryWithCaption: _galleryWithCaption = [],
		...props
	},
}: BP<MediaAndArraysBlockProps>) => {
	const gallery =
		_gallery
			.filter((image) => image.src)
			.map((image) => ({
				src: image.src ?? "",
				alt: image.alt ?? "",
			})) ?? []

	const galleryWithCaption =
		_galleryWithCaption
			.filter(({ image }) => image.src)
			.map(({ image, caption }) => ({
				image: {
					src: image.src ?? "",
					alt: image.alt ?? "",
				},
				caption,
			})) ?? []

	return (
		<MediaAndArrays
			image={
				image.src
					? {
							src: image.src,
							alt: image.alt ?? "",
						}
					: undefined
			}
			list={list}
			file={file.src}
			gallery={gallery}
			galleryWithCaption={galleryWithCaption}
			{...props}
		/>
	)
}

export const mediaAndArrays = {
	Block: MediaAndArraysBlock,
	blockName: "bring/mediaandarrays",
	blockStylesConfig: {
		spacing: {
			p: {
				t: { "": 4 },
				b: { "": 4 },
				l: { "": 4 },
				r: { "": 4 },
			},
			m: {
				t: {},
				b: {},
				l: {},
				r: {},
			},
		},
		visibility: { "": "block", md: "block", lg: "block" },
	},
} as const

export default MediaAndArraysBlock
