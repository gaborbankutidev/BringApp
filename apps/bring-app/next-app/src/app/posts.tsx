import { env } from "@/env.mjs"
import { cn } from "@/lib/utils"
import { getDynamicEntityList } from "@bring/blocks-client/content"
import Link from "next/link"
import Slider from "./slider"

export default async function Posts() {
	const { entityList } = await getDynamicEntityList(
		env.NEXT_PUBLIC_WP_BASE_URL ?? "",
		"post",
		"post"
	)

	return (
		<div className="text-gray-200">
			<Slider numberOfSlides={entityList?.length ?? 0}>
				{entityList?.map((entity) => (
					<Link
						href={entity.url ?? "#"}
						key={`post-${entity.entityId}`}
						className={cn(
							"min-h-[180px] min-w-[280px] cursor-pointer rounded-lg border border-gray-500/60 bg-gray-800/60 px-4 py-8 transition-all duration-300 hover:bg-gray-700/60 md:w-1/2"
						)}
					>
						<p className="mb-2 text-14 text-purple-600">Example WordPress Post</p>
						<h3 className="text-24s mb-4">{entity.name}</h3>
						<p>{entity.excerpt}</p>
					</Link>
				))}
			</Slider>
		</div>
	)
}
