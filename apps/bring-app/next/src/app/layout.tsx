import "@/styles/globals.css";
import {getRankMathTitle} from "@/utils/rank-math";
import {Montserrat} from "next/font/google";
import {headers} from "next/headers";
import {type ReactNode} from "react";
import Breadcrumb from "./breadcrumb";
import {Head} from "./head";
import Providers from "./providers";

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

								<div className="bg-gradient-to-b from-black from-10% to-transparent w-screen h-10 absolute top-0 left-0" />
								<div className="bg-gradient-to-t from-black from-10% to-transparent w-screen h-10 absolute bottom-0 left-0" />

								<div className="h-full flex justify-center flex-col p-4 md:pl-10 md:w-1/2 text-gray-300">
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
