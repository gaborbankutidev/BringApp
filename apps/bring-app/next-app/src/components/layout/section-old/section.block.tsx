import type { BP } from "@/bring"
import { cn } from "@/lib/utils"
import type { ColorType } from "@/styles/colors"
import type { ImageType, ResponsiveValue } from "@bring/blocks-client"
import Section from "./section"

export type SectionBlockProps = {
	backgroundColor?: ColorType
	backgroundImage?: ImageType
	asd?: ResponsiveValue<ImageType>
	dark?: boolean

	backgroundImageClassName?: string
	backgroundClassName?: string
	containerClassName?: string
}

const SectionBlock = ({
	attributes: {
		backgroundColor = "transparent",
		backgroundImage,
		asd,
		backgroundClassName,
		...props
	},
	children,
}: BP<SectionBlockProps>) => {
	console.log("asd", asd)
	return (
		<Section
			backgroundImage={
				backgroundImage?.src
					? {
							src: backgroundImage.src,
							alt: backgroundImage.alt ?? "Background image",
						}
					: undefined
			}
			backgroundClassName={cn(`bg-${backgroundColor}`, backgroundClassName)}
			{...props}
		>
			{children}
		</Section>
	)
}

export const section = {
	Block: SectionBlock,
	blockName: "bring/section",
	blockStylesConfig: {
		spacing: {
			p: {
				t: { "": 8 },
				b: { "": 8 },
			},
		},
		visibility: { "": "block", md: "block", lg: "block" },
	},
} as const

export default Section
