import Markdown from "@/components/markdown"
import { cn } from "@/lib/utils"

export const headingLevelList = [1, 2, 3, 4, 5, 6] as const
export type HeadingLevelType = (typeof headingLevelList)[number]

type HeadingProps = {
	level?: HeadingLevelType
	children: string
} & React.HTMLAttributes<HTMLHeadingElement>

/**
 * Heading is a component that helps to create headings in the editor. The same can be achieved with a markdown block.
 * Technically it could be only a block as for heading you can use the default h1, h2, h3, h4, h5, h6 tags.
 * However if your project requires a more complex heading with subtitle or other elements, you can customize this component.
 */
const Heading = ({ children, level = 2, className, ...props }: HeadingProps) => {
	const H = `h${level}` as const

	return (
		<H className={cn("text-primary", className)} {...props}>
			<Markdown content={children} inline />
		</H>
	)
}

export default Heading
