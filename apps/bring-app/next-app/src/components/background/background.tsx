import { cn } from "@/lib/utils"
import Image, { type ImageProps } from "next/image"

export type BackgroundComponentProps = {
	as?: "div" | "section" | "article" | "aside" | "main" | "header" | "footer" | "nav"
	backgroundImage?: Pick<ImageProps, "src" | "alt">
	backgroundImageMd?: Pick<ImageProps, "src" | "alt">
	backgroundImageLg?: Pick<ImageProps, "src" | "alt">
	parallax?: boolean
	className?: string
	backgroundImageClassName?: string
	backgroundClassName?: string
	containerClassName?: string
} & React.HTMLProps<HTMLDivElement>

const getBackgroundImage = (image: { src?: ImageProps["src"]; alt: string } | undefined) => {
	if (!image) return undefined

	if (typeof image.src === "string") {
		return { src: image.src, alt: image.alt }
	} else if (typeof image.src === "object" && "src" in image.src) {
		return { src: image.src.src, alt: image.alt }
	}

	return undefined
}

/**
 * Background component
 *
 * This component is used to set a background image or color to a component.
 * It can be used as a section or a div and supports responsive backgrounds.
 * Use this as wrapper for your components to set a background image or/and color.
 *
 * Responsive behavior:
 * - Mobile (default): uses backgroundImage
 * - Tablet (md): uses backgroundImageMd if provided, falls back to backgroundImage
 * - Desktop (lg): uses backgroundImageLg if provided, falls back to backgroundImageMd or backgroundImage
 *
 * @param as - the semantic HTML element to render (default: "div", examples: "section", "footer", "header", "nav", "main", "article", "aside")
 * @param children - the content of the component
 * @param backgroundImage - the background image for mobile (default)
 * @param backgroundImageMd - the background image for tablet (md breakpoint)
 * @param backgroundImageLg - the background image for desktop (lg breakpoint)
 * @param parallax - if true, the background image will be fixed and will not scroll with the content
 * @param className - the class name of the component
 * @param backgroundImageClassName - the class name of the background image
 * @param backgroundClassName - the class name of the background color overlay element (if set, the background image will be set to 80% opacity)
 * @param containerClassName - the class name of the container
 * @param props - the props of the component (HTMLDivElement props)
 */
const Background = ({
	as: Comp = "div",
	children,
	backgroundImage,
	backgroundImageMd,
	backgroundImageLg,
	parallax = false,
	className,
	backgroundImageClassName,
	backgroundClassName,
	containerClassName,
	...props
}: BackgroundComponentProps) => {
	const bgImage = getBackgroundImage(backgroundImage)
	const bgImageMd = getBackgroundImage(backgroundImageMd)
	const bgImageLg = getBackgroundImage(backgroundImageLg)

	return (
		<Comp className={cn("relative", className)} {...props}>
			{/* Mobile background image */}
			{bgImage && (
				<div
					className={cn(
						"absolute left-0 top-0 h-full w-full",
						bgImageMd && "md:hidden",
						bgImageLg && "lg:hidden",
						parallax && "bg-cover bg-fixed bg-center bg-no-repeat",
						backgroundImageClassName
					)}
					style={parallax ? { backgroundImage: `url(${bgImage.src})` } : {}}
				>
					{!parallax && (
						<Image
							src={bgImage.src}
							alt={bgImage.alt}
							fill
							className="h-full w-full object-cover"
							priority
						/>
					)}
				</div>
			)}

			{/* Tablet background image */}
			{bgImageMd && (
				<div
					className={cn(
						"absolute left-0 top-0 hidden h-full w-full md:block",
						bgImageLg && "lg:hidden",
						parallax && "bg-cover bg-fixed bg-center bg-no-repeat",
						backgroundImageClassName
					)}
					style={parallax ? { backgroundImage: `url(${bgImageMd.src})` } : {}}
				>
					{!parallax && (
						<Image
							src={bgImageMd.src}
							alt={bgImageMd.alt}
							fill
							className="h-full w-full object-cover"
							priority
						/>
					)}
				</div>
			)}

			{/* Desktop background image */}
			{bgImageLg && (
				<div
					className={cn(
						"absolute left-0 top-0 hidden h-full w-full lg:block",
						parallax && "bg-cover bg-fixed bg-center bg-no-repeat",
						backgroundImageClassName
					)}
					style={parallax ? { backgroundImage: `url(${bgImageLg.src})` } : {}}
				>
					{!parallax && (
						<Image
							src={bgImageLg.src}
							alt={bgImageLg.alt}
							fill
							className="h-full w-full object-cover"
							priority
						/>
					)}
				</div>
			)}

			{/* Background color overlay */}
			{backgroundClassName && (
				<div
					className={cn(
						"absolute left-0 top-0 h-full w-full",
						// Set opacity to 80% if background image is set
						bgImage && "opacity-80",
						bgImageMd && "md:opacity-80",
						bgImageLg && "lg:opacity-80",
						backgroundClassName
					)}
				/>
			)}

			<div className={cn("relative", containerClassName)}>{children}</div>
		</Comp>
	)
}

export default Background
