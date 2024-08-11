"use client";

import {useDynamicEntityList} from "@bring/blocks-client";
import {twJoin} from "tailwind-merge";

export default function Post() {
	const {ref, entityList} = useDynamicEntityList(
		process.env.NEXT_PUBLIC_WP_BASE_URL ?? "",
		"post",
		"post",
	);

	const entity = entityList ? entityList[0] : null;

	return (
		<div ref={ref}>
			<div
				className={twJoin(
					"bg-gray-800/60 min-h-[180px] min-w-[280px] border border-gray-500/60 px-4 py-8 rounded-lg md:w-1/2 hover:bg-gray-700/60 cursor-pointer",
					!entity && "animate-pulse",
				)}
			>
				{entity && (
					<>
						<p className="text-14 text-red-500 mb-2">
							Example post from WordPress
						</p>
						<h3 className="text-24s mb-4">{entity.name}</h3>

						{/* TODO fetch excerpt too */}
						{/* <p>{entity.excerpt}</p> */}
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
					</>
				)}
			</div>
		</div>
	);
}
