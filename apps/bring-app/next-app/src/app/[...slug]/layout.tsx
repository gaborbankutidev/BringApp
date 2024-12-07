import { Layout, getEntity } from "@/bring/render"
import type { ReactNode } from "react"
import PostLayout from "./post-layout"

type LayoutProps = {
	params: Promise<{ slug: string | string[] }>
	children: ReactNode
}

/**
 * General layout that renders the layout for any unhandled route.
 * In case the whole site is built with WordPress, this layout will handle all the routes.
 */
async function GeneralLayout({ params, children }: LayoutProps) {
	const { slug } = await params

	const entity = await getEntity(slug)
	if (!entity) return null // TODO: handle this as an Internal Server Error

	/**
	 * If the entity is a post, render the post layout.
	 * In case you use Layout builder for the post layout then remove this and let the Layout to handle the entity
	 */
	if (entity.type === "post" && entity.slug === "post") {
		return <PostLayout slug={slug}>{children}</PostLayout>
	}

	// Render the layout for the entity built with Layout builder
	return <Layout slug={slug}>{children}</Layout>
}

export default GeneralLayout
