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
	const slug = headers().get("x-slug") ?? "";
	return {
		title: await getRankMathTitle(slug),
	};
}

export default function RootLayout({children}: {children: ReactNode}) {
	const slug = headers().get("x-slug") ?? "";

	return (
		<html lang="en">
			<Head slug={slug} />

			<body className={montserrat.className}>
				<div className="bringContent">
					<Providers>
						<main>
							<div className="w-screen h-screen flex items-center relative pt-10 md:pt-0">
								<Breadcrumb />
								<a
									className="cursor-pointer text-white hover:text-purple-600 transition-all duration-300"
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

								<div className="purple-radial-gradient-lg fixed -z-10 h-[2400px] aspect-square top-4 -left-[1200px] md:left-auto md:top-auto md:right-[15%] lg:right-1/3 md:translate-x-[240px] -translate-y-[240px] md:translate-y-[0px]" />
								<div className="bg-gray-950 fixed -z-10 h-[2000px] rounded-full aspect-square top-4 -left-[1000px] md:left-auto md:top-auto md:right-[15%] lg:right-1/3" />
							</div>
						</main>
					</Providers>
				</div>
			</body>
		</html>
	);
}
