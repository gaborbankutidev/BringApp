import Footer from "@/components/templates/footer";
import Header from "@/components/templates/header";
import "@/styles/globals.css";
import {getRankMathTitle} from "@/utils/rank-math";
import {Montserrat} from "next/font/google";
import {headers} from "next/headers";
import {type ReactNode} from "react";
import {Head} from "./head";
import Providers from "./providers";

const montserrat = Montserrat({
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	subsets: ["latin", "latin-ext"],
});

export async function generateMetadata() {
	const slug = (await headers()).get("x-slug") ?? "";
	return {
		title: await getRankMathTitle(slug),
	};
}

const Bg = () => (
	<>
		<div className="bg-gray-800 fixed w-full h-full top-0 left-0 -z-10" />
		<div className="purple-radial-gradient-lg h-[2400px] aspect-square fixed -z-10  top-4 md:-top-[800px] -right-[800px] md:right-1/4 lg:right-1/3 md:translate-x-[240px] -translate-y-[240px] md:translate-y-[0px]" />
		<div className="bg-gray-900 h-[2000px] rounded-full aspect-square fixed -z-10 top-4 md:-top-[600px] -right-[600px] md:right-1/4 lg:right-1/3" />
	</>
);

export default async function RootLayout({children}: {children: ReactNode}) {
	const slug = (await headers()).get("x-slug") ?? "";

	return (
		<html lang="en">
			<Head slug={slug} />
			<body className={montserrat.className}>
				<div className="bringContent min-h-screen relative flex flex-col">
					<Bg />
					<Providers>
						<Header />
						<main className="flex-grow">{children}</main>
						<Footer />
					</Providers>
				</div>
			</body>
		</html>
	);
}
