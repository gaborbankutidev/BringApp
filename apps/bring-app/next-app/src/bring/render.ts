import { env } from "@/env.mjs"
import { initRender } from "@bring/blocks-client/init-render"
import { notFound, redirect } from "next/navigation"
import { blockList } from "./list"
import type { EP } from "./types"

export const { getEntity, Main, Layout, Footer } = initRender<EP>(
	env.NEXT_PUBLIC_WP_BASE_URL,
	(redirectTo) => {
		redirect(redirectTo)
	},
	() => {
		notFound()
	},
	blockList
)
