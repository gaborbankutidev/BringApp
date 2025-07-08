import { cn } from "@/lib/utils"
import Image, { type ImageProps } from "next/image"

export type BackgroundComponentProps = {
	backgroundImage?: Pick<ImageProps, "src" | "alt">
	parallax?: boolean
	className?: string
	backgroundImageClassName?: string
	backgroundClassName?: string
	containerClassName?: string
} & React.HTMLProps<HTMLDivElement>

type ExtendedBackgroundComponentProps = BackgroundComponentProps & { section?: boolean }

const getBackgroundImageSrc = (src?: ImageProps["src"]) => {
	if (typeof src === "string") {
		return src
	} else if (typeof src === "object" && "src" in src) {
		return src.src
	}
	return undefined
}

/**
 * Background component
 *
 * This component is used to set a background image or color to a component.
 * It can be used as a section or a div.
 * Use this as wrapper for your components to set a background image or/and color.
 * Example: Section layout component
 *
 * @param section - if true, the component will be rendered as a section
 * @param children - the content of the component
 * @param backgroundImage - the background image
 * @param parallax - if true, the background image will be fixed and will not scroll with the content
 * @param className - the class name of the component
 * @param backgroundImageClassName - the class name of the background image
 * @param backgroundClassName - the class name of the background
 * @param containerClassName - the class name of the container
 * @param props - the props of the component (HTMLDivElement props)
 */
const Background = ({
	section,
	children,
	backgroundImage,
	parallax = false,

	className,
	backgroundImageClassName,
	backgroundClassName,
	containerClassName,
	...props
}: ExtendedBackgroundComponentProps) => {
	const Comp = section ? "section" : "div"

	const backgroundSource = getBackgroundImageSrc(backgroundImage?.src)
	const backgroundImageStyle =
		backgroundSource && parallax
			? {
					backgroundImage: `url(${backgroundSource})`,
				}
			: {}

	return (
		<Comp className={cn("relative", !backgroundImage && backgroundClassName, className)} {...props}>
			{/* Background image div */}
			{backgroundImage && (
				<div
					className={cn(
						"absolute left-0 top-0 h-full w-full",
						parallax && "bg-cover bg-fixed bg-center bg-no-repeat",
						backgroundImageClassName
					)}
					style={backgroundImageStyle}
				>
					{!parallax && (
						<Image
							src={backgroundImage?.src}
							alt={backgroundImage?.alt}
							fill
							style={{ objectFit: "cover" }}
							priority
						/>
					)}
				</div>
			)}

			{/* Background color div - only if background image is set */}
			{backgroundImage && backgroundClassName && (
				<div
					className={cn("absolute left-0 top-0 h-full w-full", "opacity-80", backgroundClassName)}
				/>
			)}

			<div className={cn("relative", containerClassName)}>{children}</div>
		</Comp>
	)
}

export default Background
