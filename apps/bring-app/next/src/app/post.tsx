"use client";

import Markdown from "@/components/markdown";
import {useDynamicEntityList} from "@bring/blocks-client";
import {useEffect, useState} from "react";
import {twJoin} from "tailwind-merge";

export default function Post() {
	const [status, setStatus] = useState<
		"idle" | "loading" | "error" | "success"
	>("idle");

	// TODO invalidate next cache from WP
	const {ref, entityList} = useDynamicEntityList(
		process.env.NEXT_PUBLIC_WP_BASE_URL ?? "",
		"post",
		"post",
	);

	const entity = entityList ? entityList[0] : null;

	const useHealthCheck = async () => {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/bring/healthcheck`,
			);

			if (res.status !== 200) {
				return false;
			}

			return res;
		} catch (e) {
			console.error("WordPress healthcheck failed", e);
		}

		return null;
	};

	useEffect(() => {
		setStatus("loading");

		useHealthCheck().then((res) => {
			if (!res || res.status !== 200) {
				setStatus("error");
				return;
			} else {
				setStatus("success");
			}
		});
	}, []);

	return (
		<div ref={ref}>
			<div
				className={twJoin(
					"bg-gray-800/60 min-h-[180px] flex justify-center items-center min-w-[280px] border border-gray-500/60 px-4 py-8 rounded-lg md:w-1/2 ",
					(status === "idle" || (status === "loading" && !entity)) &&
						"animate-pulse",
					status === "success" && "hover:bg-gray-700/60 cursor-pointer",
				)}
			>
				<div className="w-full">
					{(status === "loading" || status === "idle") && (
						<div className="flex w-full flex-col gap-4">
							<div className="bg-gray-800 rounded-md w-full h-4" />
							<div className="bg-gray-800 rounded-md w-1/2 h-4" />
						</div>
					)}

					{status === "error" && (
						<Markdown className="text-red-500 text-center">
							**WordPress not found.** Make sure you configured your environment
							variables correctly, started your WordPress site with `yarn
							services:up` and activated your theme.
						</Markdown>
					)}

					{status === "success" && entity && (
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
		</div>
	);
}
