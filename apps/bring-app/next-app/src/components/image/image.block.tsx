import type { BP } from "@/bring"
import type { SourceType } from "@/editor/utils/lists"
import type { ImageType } from "@bring/blocks-client/types"
import { defaultImageValue } from "@bring/blocks-client/utils"
import Image from "./image"

export type ImageBlockProps = {
	contentSource?: SourceType
	image: ImageType
	imageClassName?: string
	caption?: string
	captionClassName?: string
	source?: string
	sourceClassName?: string
	link: {
		href?: string
		newTab?: boolean
	}
	lightbox?: boolean
}

const ImageBlock = ({
	attributes: {
		contentSource = "manual",
		image = defaultImageValue,
		imageClassName,
		link = {},
		...props
	},
	entityProps,
}: BP<ImageBlockProps>) => {
	const img = contentSource === "dynamic" ? entityProps?.image : image
	if (!img?.src) return null

	return (
		// eslint-disable-next-line jsx-a11y/alt-text
		<Image
			image={{
				src: img.src,
				alt: img.alt ?? "",
				className: imageClassName,
			}}
			link={link.href ? { href: link.href, newTab: link.newTab } : undefined}
			{...props}
		/>
	)
}

export const image = {
	Block: ImageBlock,
	blockName: "bring/image",
	blockStylesConfig: {
		spacing: {
			p: {
				t: {},
				b: {},
				l: {},
				r: {},
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

export default ImageBlock
