import { cn } from "@/lib/utils"
import { type ColorType } from "@/styles/colors"
import { type ImageType, type ResponsiveValue } from "@bring/blocks-client"
import { Slot } from "@radix-ui/react-slot"
import { type ReactNode } from "react"

export type BackgroundBlockProps = {
	backgroundColor?: ColorType
	backgroundImage?: ResponsiveValue<ImageType>
	gradient?: boolean
	parallax?: boolean

	backgroundImageClassName?: string
	backgroundClassName?: string
	containerClassName?: string
}

type ExtendedBackgroundBlockProps = BackgroundBlockProps & {
	children: ReactNode
	defaultBackgroundColor?: ColorType
}

/**
 * Background block
 *
 * This component is used to create a block for a component with the background wrapper component.
 * Use this as wrapper for your block to set a background image or/and color transformation from block to component.
 * Example: Section layout block
 *
 * @param children - the content of the component
 * @param backgroundColor - the background color
 * @param defaultBackgroundColor - the default background color
 * @param backgroundImage - the background image
 * @param gradient - if true, the background will be a gradient
 * @param parallax - if true, the background image will be fixed and will not scroll with the content
 * @param backgroundImageClassName - the class name of the background image
 * @param backgroundClassName - the class name of the background
 * @param containerClassName - the class name of the container
 * @param props - the props of the block (Block props)
 */
const Background = ({
	children,
	defaultBackgroundColor,
	backgroundColor = defaultBackgroundColor,
	backgroundImage = {},
	gradient,
	backgroundClassName,
	...props
}: ExtendedBackgroundBlockProps) => {
	const extendedProps = {
		backgroundImage: backgroundImage[""]?.src
			? {
					src: backgroundImage[""].src,
					alt: backgroundImage[""].alt ?? "Background image",
				}
			: undefined,
		backgroundImageMd: backgroundImage.md?.src
			? {
					src: backgroundImage.md.src,
					alt: backgroundImage.md.alt ?? "Background image",
				}
			: undefined,
		backgroundImageLg: backgroundImage.lg?.src
			? {
					src: backgroundImage.lg.src,
					alt: backgroundImage.lg.alt ?? "Background image",
				}
			: undefined,

		backgroundClassName: cn(
			backgroundColor &&
				(!gradient ? `bg-${backgroundColor}` : `bg-gradient-to-b from-${backgroundColor}`),
			backgroundClassName
		),
		...props,
	}

	return <Slot {...extendedProps}>{children}</Slot>
}

export default Background
