"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {BiArrowBack} from "react-icons/bi";

export default function Breadcrumb() {
	"use client";
	const path = usePathname();
	return (
		<>
			{path !== "/" && (
				<Link
					className="absolute top-4 left-10 z-10 text-gray-300 hover:text-purple-600 transition-all duration-300 flex justify-center items-center gap-2"
					href="/"
				>
					<BiArrowBack />
					Back to home
				</Link>
			)}
		</>
	);
}
