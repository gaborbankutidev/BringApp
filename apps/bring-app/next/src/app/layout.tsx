import "@/styles/globals.css";
import {getRankMathTitle} from "@/utils/rank-math";
import {Montserrat} from "next/font/google";
import {headers} from "next/headers";
import {type ReactNode} from "react";
import {BiLogoGithub} from "react-icons/bi";
import Breadcrumb from "./breadcrumb";
import {Head} from "./head";
import Providers from "./providers";

export const dynamic = "force-dynamic";

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

export default async function RootLayout({children}: {children: ReactNode}) {
	const slug = (await headers()).get("x-slug") ?? "";

	return (
		<html lang="en">
			<Head slug={slug} />

			<body className={montserrat.className}>
				<div className="bringContent">
					<Providers>
						<main>
							<div className="w-full h-screen relative pt-10 flex flex-col transition-all duration-300">
								<Breadcrumb />
								<a
									className="cursor-pointer text-white hover:text-purple-600"
									href="https://github.com/gaborbankutidev/BringApp"
									target="_blank"
									rel="noopener noreferrer"
								>
									<BiLogoGithub
										className="absolute top-4 right-10 z-10"
										size={32}
									/>
								</a>

								<div className="p-4 md:pl-10 w-full md:w-2/3 lg:w-1/2 text-gray-300">
									{children}
								</div>

								<div className="purple-radial-gradient-lg h-[2400px] aspect-square fixed -z-10  top-4 md:-top-[800px] -right-[800px] md:right-1/4 lg:right-1/3 md:translate-x-[240px] -translate-y-[240px] md:translate-y-[0px]" />
								<div className="bg-gray-950 h-[2000px] rounded-full aspect-square fixed -z-10 top-4 md:-top-[600px] -right-[600px] md:right-1/4 lg:right-1/3" />
								<div className="flex justify-center text-center text-11 mt-auto py-4 opacity-90">
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
	);
}
