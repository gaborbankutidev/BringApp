import Background, { type BackgroundComponentProps } from "@/components/background/background"
import { cn } from "@/lib/utils"
import { containerSizes, type ContainerSizeType } from "@/styles/container"

type SectionProps = {
	dark?: boolean
	containerSize?: ContainerSizeType
	className?: string
} & BackgroundComponentProps

/**
 * Section is the top level building block of pages.
 * It sets the container size and the dark mode.
 *
 * @param children - the content of the section
 * @param dark - if true, the section will be in dark mode
 * @param containerSize - the size of the container
 * @param containerClassName - the class name of the container (use this to set flex, grid, etc.)
 * @param className - the class name of the section html element
 * @param props - the props of the section (BackgroundComponentProps + HTMLDivElement props)
 */
const Section = ({
	children,
	as = "section",
	dark = false,
	containerSize = "1520",
	containerClassName,
	className,
	...props
}: SectionProps) => {
	return (
		<Background
			as={as}
			className={cn("relative", dark ? "dark" : "light", className)}
			containerClassName={cn(containerSizes[containerSize], containerClassName)}
			{...props}
		>
			{children}
		</Background>
	)
}

export default Section
