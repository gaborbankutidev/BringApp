import {getDynamicEntityList} from "@bring/blocks-client/content";
import Link from "next/link";
import {twJoin} from "tailwind-merge";
import Slider from "./slider";

export default async function Posts() {
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
