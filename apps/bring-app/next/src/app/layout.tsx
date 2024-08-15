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
							<div className="w-screen h-screen flex items-center relative overflow-hidden pt-10 md:pt-0">
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

								<div className="flex h-[80vh] flex-col p-4 md:pl-10 md:w-1/2 text-gray-300 overflow-y-scroll">
									{children}
								</div>

								<div className="purple-radial-gradient-lg absolute -z-10 h-[160vh] aspect-square md:right-[22%] -right-32" />
								<div className="bg-gray-950 absolute -z-10 h-[160vh] rounded-full aspect-square md:right-1/3 right-4" />
							</div>
						</main>
					</Providers>
				</div>
			</body>
		</html>
	);
}
