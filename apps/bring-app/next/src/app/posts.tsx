import Markdown from "@/components/markdown";
import {getDynamicEntityList} from "@bring/blocks-client/content";
import Link from "next/link";
import {twJoin} from "tailwind-merge";
import {getWpStatus} from "./get-wp-status";
import Slider from "./slider";

export default async function Posts() {
	const wpStatus = await getWpStatus();

	if (wpStatus === null) {
		<div className="bg-gray-800/60 min-h-[180px] flex justify-center items-center min-w-[280px] border border-gray-500/60 px-4 py-8 rounded-lg md:w-1/2 animate-pulse">
			<div className="flex w-full flex-col gap-4">
				<div className="bg-gray-800 rounded-md w-full h-4" />
				<div className="bg-gray-800 rounded-md w-1/2 h-4" />
			</div>
		</div>;
	}

	if (wpStatus === "not-set-up") {
		return (
			<div className="bg-gray-800/60 min-h-[180px] flex justify-center items-center min-w-[280px] border border-gray-500/60 px-4 py-8 rounded-lg md:w-1/2 border-red-600">
				<div>
					<h3 className="text-24s mb-4 text-red-600">WordPress not set up</h3>
					<Markdown className="text-red-600">
						Make sure you visited `http://localhost:8080` and set up your
						WordPress installation.
					</Markdown>
				</div>
			</div>
		);
	}

	if (wpStatus === "theme-not-activated") {
		return (
			<div className="bg-gray-800/60 min-h-[180px] flex justify-center items-center min-w-[280px] border border-gray-500/60 px-4 py-8 rounded-lg md:w-1/2 border-red-600">
				<div>
					<h3 className="text-24s mb-4 text-red-600">
						WordPress theme not activated
					</h3>
					<Markdown className="text-red-600">
						Make sure you visited `http://localhost:8080/wp-admin` and activated
						your project theme.
					</Markdown>
				</div>
			</div>
		);
	}

	if (wpStatus === "error") {
		return null;
	}

	const {entityList} = await getDynamicEntityList(
		process.env.NEXT_PUBLIC_WP_BASE_URL ?? "",
		"post",
		"post",
	);

	return (
		<div>
			<Slider numberOfSlides={entityList?.length ?? 0}>
				{entityList?.map((entity) => (
					<Link
						href={entity.url ?? "#"}
						key={`post-${entity.entityId}`}
						className={twJoin(
							"bg-gray-800/60 min-h-[180px] min-w-[280px] border border-gray-500/60 px-4 py-8 rounded-lg md:w-1/2 cursor-pointer hover:bg-gray-700/60 transition-all duration-300",
						)}
					>
						<p className="text-14 text-purple-600 mb-2">
							Example post from WordPress
						</p>
						<h3 className="text-24s mb-4">{entity.name}</h3>
						<p>{entity.excerpt}</p>
					</Link>
				))}
			</Slider>
		</div>
	);
}
