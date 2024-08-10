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
						<main className="lg:pt-[100px]">{children}</main>
						<footer className="flex h-[400px] items-center justify-center bg-black text-white relative">
							<div className="absolute bottom-full w-screen h-[200px] bg-gradient-to-t from-black to-transparent" />
							footer placeholder
						</footer>
					</Providers>
				</div>
			</body>
		</html>
	);
}
