import Markdown from "@/components/markdown";
import Link from "next/link";
import {twJoin} from "tailwind-merge";
import {getWpStatus} from "./get-wp-status";
import Posts from "./posts";

export default async function Home() {
	const wpStatus = await getWpStatus();

	return (
		<>
			<p className="uppercase tracking-wide text-14 md:text-16 xl:text-20">
				Welcome to your new journey with
			</p>
			<h1 className="tracking-tight font-bold text-[48px] md:text-[72px] xl:text-[90px] mb-8 -ml-1">
				<span className="text-purple-600">Bring</span>{" "}
				<span className="text-white">App</span>
			</h1>

			<p className="text-gray-200 mb-4">
				BringApp is a framework designed to help developers build NextJs
				applications using WordPress as a headless CMS and site builder. It
				provides a set of tools and components to help you get started quickly
				and build your app with ease.
			</p>

			<div className="flex xl:flex-row flex-col gap-4 md:mb-24 mb-8">
				<Link
					href="/docs"
					className="text-white text-center md:text-18 from-60% bg-purple-600 hover:bg-purple-800 rounded-full py-2 px-8 transition-all duration-300 cursor-pointer"
				>
					Get Started
				</Link>

				<a
					target="_blank"
					rel="noopener noreferrer"
					href={`${process.env.NEXT_PUBLIC_WP_BASE_URL}/wp-admin/`}
					className={twJoin(
						"text-white text-center md:text-18 outline outline-purple-600 hover:text-white hover:outline-white -outline-offset-2 rounded-full py-2 px-8 transition-all duration-300",
						wpStatus === "error" && "pointer-events-none opacity-40",
					)}
				>
					{wpStatus === "ok" && "Open WordPress admin"}
					{wpStatus === "not-set-up" && "Set up WordPress"}
					{wpStatus === "theme-not-activated" && "Activate WordPress theme"}
					{wpStatus === "error" && "WordPress error"}
				</a>
			</div>

			{wpStatus === null && (
				<div className="bg-gray-800/60 min-h-[180px] flex justify-center items-center min-w-[280px] border border-gray-500/60 px-4 py-8 rounded-lg md:w-1/2 animate-pulse">
					<div className="flex w-full flex-col gap-4">
						<div className="bg-gray-800 rounded-md w-full h-4" />
						<div className="bg-gray-800 rounded-md w-1/2 h-4" />
					</div>
				</div>
			)}

			{wpStatus === "not-set-up" && (
				<div className="bg-gray-800/60 min-h-[180px] flex justify-center items-center min-w-[280px] border border-gray-500/60 px-4 py-8 rounded-lg border-red-600">
					<div>
						<h3 className="text-24s mb-4 text-red-600">WordPress not set up</h3>
						<Markdown className="text-red-600">
							Make sure you visited `http://localhost:8080` and set up your
							WordPress installation.
						</Markdown>
					</div>
				</div>
			)}

			{wpStatus === "theme-not-activated" && (
				<div className="bg-gray-800/60 min-h-[180px] flex justify-center items-center min-w-[280px] border border-gray-500/60 px-4 py-8 rounded-lg border-red-600">
					<div>
						<h3 className="text-24s mb-4 text-red-600">
							WordPress theme not activated
						</h3>
						<Markdown className="text-red-600">
							Make sure you visited `http://localhost:8080/wp-admin` and
							activated your project theme.
						</Markdown>
					</div>
				</div>
			)}

			{wpStatus === "error" && (
				<div className="bg-gray-800/60 min-h-[180px] flex justify-center items-center min-w-[280px] border border-gray-500/60 px-4 py-8 rounded-lg border-red-600">
					<div>
						<h3 className="text-24s mb-4 text-red-600">
							Unknown WordPress error
						</h3>
						<Markdown className="text-red-600">
							Visit `http://localhost:8080/wp-admin` and check the status of
							your WordPress installation.
						</Markdown>
					</div>
				</div>
			)}

			<Posts />
		</>
	);
}
