import Link from "next/link";
import {twJoin} from "tailwind-merge";
import {getWpStatus} from "./get-wp-status";
import Posts from "./posts";

export const dynamic = "force-dynamic";
export const revalidate = 3;

export default async function Home() {
	const wpStatus = await getWpStatus();
	return (
		<>
			{/* TODO respo */}

			<p className="uppercase tracking-wide text-14 md:text-16 xl:text-20">
				Welcome to your new journey with
			</p>
			<h1 className="tracking-tight font-bold text-[48px] md:text-[72px] xl:text-[90px] xl:leading-[90px] mb-8">
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
						!wpStatus && "pointer-events-none opacity-40",
					)}
				>
					Open WordPress admin
				</a>
			</div>
			<Posts />
		</>
	);
}
