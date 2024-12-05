import "@/styles/globals.css"
import { getRankMathTitle } from "@/utils/rank-math"
import { Montserrat } from "next/font/google"
import { headers } from "next/headers"
import { type ReactNode } from "react"
import { BiLogoGithub } from "react-icons/bi"
import Breadcrumb from "./breadcrumb"
import { Head } from "./head"
import Providers from "./providers"

export const dynamic = "force-dynamic"

const montserrat = Montserrat({
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	subsets: ["latin", "latin-ext"],
})

export async function generateMetadata() {
	const slug = (await headers()).get("x-slug") ?? ""
	return {
		title: await getRankMathTitle(slug),
	}
}

export default async function RootLayout({ children }: { children: ReactNode }) {
	const slug = (await headers()).get("x-slug") ?? ""

	return (
		<html lang="en">
			<Head slug={slug} />

			<body className={montserrat.className}>
				<div className="bringContent">
					<Providers>
						<main>
							<div className="relative flex h-screen w-full flex-col pt-10 transition-all duration-300">
								<Breadcrumb />
								<a
									className="cursor-pointer text-white hover:text-purple-600"
									href="https://github.com/gaborbankutidev/BringApp"
									target="_blank"
									rel="noopener noreferrer"
								>
									<BiLogoGithub className="absolute right-10 top-4 z-10" size={32} />
								</a>

								<div className="w-full p-4 text-gray-300 md:w-2/3 md:pl-10 lg:w-1/2">
									{children}
								</div>

								<div className="purple-radial-gradient-lg fixed -right-[800px] top-4 -z-10 aspect-square h-[2400px] -translate-y-[240px] md:-top-[800px] md:right-1/4 md:translate-x-[240px] md:translate-y-[0px] lg:right-1/3" />
								<div className="fixed -right-[600px] top-4 -z-10 aspect-square h-[2000px] rounded-full bg-gray-950 md:-top-[600px] md:right-1/4 lg:right-1/3" />
								<div className="mt-auto flex justify-center py-4 text-center text-11 text-white opacity-90">
									© {new Date().getFullYear()} Bring App
									<br></br>
									Made with ❤️ in Hungary
								</div>
							</div>
						</main>
					</Providers>
				</div>
			</body>
		</html>
	)
}
