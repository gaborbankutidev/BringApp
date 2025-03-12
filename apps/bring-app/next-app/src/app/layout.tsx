import Footer from "@/components/templates/footer"
import Header from "@/components/templates/header"
import { env } from "@/env.mjs"
import "@/styles/globals.css"
import { getRankMathTitle } from "@bring/blocks-client/rank-math"
import { GoogleTagManager } from "@next/third-parties/google"
import { Montserrat } from "next/font/google"
import { headers } from "next/headers"
import { type ReactNode } from "react"
import { Head } from "./head"
import Providers from "./providers"

const montserrat = Montserrat({
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	subsets: ["latin", "latin-ext"],
})

export async function generateMetadata() {
	const header = await headers()
	const slug = header.get("x-slug") ?? ""
	const wpURL = env.NEXT_PUBLIC_WP_BASE_URL
	const nextURL = env.NEXT_PUBLIC_BASE_URL

	return {
		title: await getRankMathTitle(wpURL, nextURL, slug),
	}
}

const Bg = () => (
	<>
		<div className="fixed left-0 top-0 -z-10 h-full w-full bg-gray-800" />
		<div className="purple-radial-gradient-lg fixed -right-[800px] top-4 -z-10 aspect-square h-[2400px] -translate-y-[240px] md:-top-[800px] md:right-1/4 md:translate-x-[240px] md:translate-y-[0px] lg:right-1/3" />
		<div className="fixed -right-[600px] top-4 -z-10 aspect-square h-[2000px] rounded-full bg-gray-900 md:-top-[600px] md:right-1/4 lg:right-1/3" />
	</>
)

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<Head />
			{env.NEXT_PUBLIC_GTM && <GoogleTagManager gtmId={env.NEXT_PUBLIC_GTM} />}
			<body className={montserrat.className}>
				<div className="bringContent relative flex min-h-screen flex-col">
					<Bg />
					<Providers>
						<Header />
						<main className="flex-grow">{children}</main>
						<Footer />
					</Providers>
				</div>
			</body>
		</html>
	)
}
