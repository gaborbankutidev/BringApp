import { env } from "@/env.mjs"
import { initRender } from "@bring/blocks-client/init-render"
import { notFound, redirect } from "next/navigation"
import { blockList } from "./list"
import type { Context, EntityProps, Menu, MenuItem, SiteProps } from "./types"

/**
 * Initialize Bring App render functions by
 * - extending with types
 * - setting the base URL
 * - injecting redirect, notFound handlers
 * - injecting block list
 */
export const { getEntity, Main, Layout, Footer } = initRender<
	EntityProps,
	Menu,
	MenuItem,
	SiteProps,
	Context
>(
	env.NEXT_PUBLIC_WP_BASE_URL,
	(redirectTo) => {
		redirect(redirectTo)
	},
	() => {
		notFound()
	},
	blockList
)
