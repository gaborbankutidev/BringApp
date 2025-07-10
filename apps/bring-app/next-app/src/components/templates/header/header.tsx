import Section from "@/components/layout/section"
import { BiLogoGithub } from "react-icons/bi"
import Breadcrumb from "./breadcrumb"

/**
 * Implement your custom header here
 * Or delete this file and replace Header in RootLayout with the Bring Header render component to build header in WordPress
 */
const Header = () => (
	<Section containerSize="wide" containerClassName="py-4 flex" as="header">
		<Breadcrumb />
		<a
			className="ml-auto cursor-pointer text-white transition-colors duration-300 hover:text-purple-600"
			href="https://github.com/gaborbankutidev/BringApp"
			target="_blank"
			rel="noopener noreferrer"
		>
			<BiLogoGithub size={32} />
		</a>
	</Section>
)

export default Header
