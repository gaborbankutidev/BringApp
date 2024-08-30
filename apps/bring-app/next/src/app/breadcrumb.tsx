"use client";

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {BiArrowBack} from "react-icons/bi";

const Breadcrumb = () => {
	const router = useRouter();
	const path = usePathname();
	const isSubPage = path.includes("/docs/");

	return (
		<>
			{path !== "/" && !isSubPage && (
				<Link
					className="absolute top-4 left-10 z-10 text-gray-300 hover:text-purple-600 transition-all duration-300 flex justify-center items-center gap-2"
					href="/"
				>
					<BiArrowBack />
					Back to home
				</Link>
			)}

			{isSubPage && (
				<span
					className="cursor-pointer absolute top-4 left-10 z-10 text-gray-300 hover:text-purple-600 transition-all duration-300 flex justify-center items-center gap-2"
					onClick={() => router.back()}
				>
					<BiArrowBack />
					Back
				</span>
			)}
		</>
	);
};

export default Breadcrumb;
