import type { BP } from "@/bring"
import type { SourceType } from "@/editor/utils/lists"
import { cn } from "@/lib/utils"
import type { ImageType } from "@bring/blocks-client/types"
import { defaultImageValue } from "@bring/blocks-client/utils"
import Image from "./image"

export const sizes = {
	"900": { width: 900, height: 600 },
	"1200": { width: 1200, height: 800 },
	"1800": { width: 1800, height: 1200 },
	"2400": { width: 2400, height: 1600 },
} as const

export type ImageBlockProps = {
	contentSource: SourceType
	image: ImageType
	size?: keyof typeof sizes
	caption?: string
	source?: string
	link?: string
	newTab?: boolean
	lightbox?: boolean
	cover?: boolean
}

const ImageBlock = ({
	attributes: {
		contentSource = "manual",
		image = defaultImageValue,
		size = "900",
		link = "",
		newTab = false,
		lightbox = false,
		cover = false,
		className,
		...props
	},
	entityProps,
}: BP<ImageBlockProps>) => {
	const img = contentSource === "dynamic" ? entityProps?.image : image
	if (!img?.src) return null

	const classNames = cn(cover && "h-full object-cover", className)

	return (
		<Image // eslint-disable-line jsx-a11y/alt-text
			image={{
				src: img.src,
				alt: img.alt ?? "",
				width: sizes[size].width,
				height: sizes[size].height,
			}}
			link={
				link && !lightbox
					? // @ts-ignore
						{ href: link, target: newTab ? "_blank" : "_self" }
					: undefined
			}
			lightbox={lightbox}
			className={classNames}
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

export default Image
