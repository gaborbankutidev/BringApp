import { cn } from "@/lib/utils"
import Image, { type ImageProps } from "next/image"

type SectionProps = {
	backgroundImage?: Pick<ImageProps, "src" | "alt">
	dark?: boolean
	className?: string
	backgroundImageClassName?: string
	backgroundClassName?: string
	containerClassName?: string
} & React.HTMLProps<HTMLDivElement>

const baseStye = "relative bg-no-repeat bg-cover overflow-hidden bg-center"
const bgImageBaseStyle =
	"absolute w-full h-full top-0 left-0 bg-no-repeat bg-cover bg-center bg-fixed"
const bgBaseStyle = "absolute w-full h-full top-0 left-0"
const containerBaseStyle = "relative"

/**
 * Section is the top level building block of pages.
 */
const Section = ({
	children,
	backgroundImage,
	dark = false,

	className,
	backgroundImageClassName,
	backgroundClassName,
	containerClassName,
	...props
}: SectionProps) => {
	const sCn = cn(baseStye, dark ? "dark" : "light", className)
	const bgImageCn = cn(bgImageBaseStyle, backgroundImageClassName)
	const bgCn = cn(bgBaseStyle, backgroundImage && "opacity-80", backgroundClassName)
	const containerCn = cn(containerBaseStyle, containerClassName)

	return (
		<section className={sCn} {...props}>
			{backgroundImage && (
				<div className={bgImageCn}>
					<Image
						src={backgroundImage?.src}
						alt={backgroundImage?.alt}
						fill
						style={{ objectFit: "cover" }}
						priority
					/>
				</div>
			)}
			<div className={bgCn} />
			<div className={containerCn}>{children}</div>
		</section>
	)
}

export default Section
