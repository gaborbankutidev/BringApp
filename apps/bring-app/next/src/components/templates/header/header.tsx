import {rowSizes} from "@/components/layout/row";
import clsx from "clsx";
import {BiLogoGithub} from "react-icons/bi";
import Breadcrumb from "./breadcrumb";

/**
 * Implement your custom header here
 * Or delete this file and replace Header in RootLayout with the Bring Header render component to build header in WordPress
 */
const Header = () => (
	<header className={clsx("py-4 flex", rowSizes["1520"])}>
		<Breadcrumb />
		<a
			className="cursor-pointer text-white hover:text-purple-600 transition-colors duration-300 ml-auto"
			href="https://github.com/gaborbankutidev/BringApp"
			target="_blank"
			rel="noopener noreferrer"
		>
			<BiLogoGithub size={32} />
		</a>
	</header>
);

export default Header;
