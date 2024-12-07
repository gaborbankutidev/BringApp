"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BiArrowBack } from "react-icons/bi"

const Breadcrumb = () => {
	const router = useRouter()
	const path = usePathname()
	const isSubPage = path.includes("/docs/")

	return (
		<>
			{path !== "/" && !isSubPage && (
				<Link
					className="flex items-center justify-center gap-2 text-gray-300 transition-all duration-300 hover:text-purple-600"
					href="/"
				>
					<BiArrowBack />
					Back to home
				</Link>
			)}

			{isSubPage && (
				<span
					className="flex cursor-pointer items-center justify-center gap-2 text-gray-300 transition-all duration-300 hover:text-purple-600"
					onClick={() => router.back()}
				>
					<BiArrowBack />
					Back
				</span>
			)}
		</>
	)
}

export default Breadcrumb
