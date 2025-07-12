import { getSiteProps } from "@/bring/server"
import Section from "@/components/layout/section"
import { BiLogoGithub, BiLogoLinkedin } from "react-icons/bi"
import Breadcrumb from "./breadcrumb"

type HeaderProps = Omit<React.HTMLProps<HTMLDivElement>, "as" | "children">

/**
 * Implement your custom header here
 * Or delete this file and replace Header in RootLayout with the Bring Header render component to build header in WordPress
 */
const Header = async (props: HeaderProps) => {
	const siteProps = await getSiteProps()
	if (!siteProps) return null

	return (
		<Section containerSize="wide" containerClassName="py-4 flex" as="header" {...props}>
			<Breadcrumb />
			<div className="ml-auto flex items-center gap-4">
				{/* LinkedIn social link from SiteProps as an Example for using SiteProps */}
				{siteProps.socialLinks.linkedin && (
					<a
						className="cursor-pointer text-foreground transition-colors duration-300 hover:text-purple-600"
						href={siteProps.socialLinks.linkedin}
						target="_blank"
						rel="noopener noreferrer"
					>
						<BiLogoLinkedin size={28} />
					</a>
				)}
				<a
					className="cursor-pointer text-foreground transition-colors duration-300 hover:text-purple-600"
					href={siteProps.socialLinks.github ?? "https://github.com/gaborbankutidev/BringApp"}
					target="_blank"
					rel="noopener noreferrer"
				>
					<BiLogoGithub size={32} />
				</a>
			</div>
		</Section>
	)
}

export default Header
