import { getSiteProps } from "@/bring/server"
import Section from "@/components/layout/section"
import { cn } from "@/lib/utils"
import { findMenu } from "@/utils/find-menu"
import Link from "next/link"

type FooterProps = Omit<React.HTMLProps<HTMLDivElement>, "as" | "children">

/**
 * Implement your custom footer here
 * Or delete this file and replace Footer in the RootLayout with the Bring Footer render component to build footer in WordPress
 */
const Footer = async ({ className, ...props }: FooterProps) => {
	const siteProps = await getSiteProps()
	if (!siteProps) return null

	const menu = findMenu(siteProps.menuLocations, siteProps.menus, "bottomMenu")

	return (
		<Section
			className={cn("mt-auto py-4 text-center text-11 text-foreground opacity-90", className)}
			as="footer"
			{...props}
		>
			<div>
				© {new Date().getFullYear()} Bring App
				<br />
				Made with ❤️ in Hungary
			</div>
			{menu.length > 0 && (
				<div className="mt-3 flex justify-center gap-4">
					{menu.map(({ name, url, id }) => (
						<Link
							key={id}
							href={url}
							className="text-11 text-foreground opacity-90 hover:opacity-100"
						>
							{name}
						</Link>
					))}
				</div>
			)}
		</Section>
	)
}

export default Footer
