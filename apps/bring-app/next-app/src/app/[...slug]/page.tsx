import { Main } from "@/bring/render"

type PageProps = {
	params: Promise<{ slug: string | string[] }>
}

/**
 * General page that renders the main content for any unhandled route.
 * In case the whole site is built with WordPress, this page will handle all the routes.
 */
async function GeneralPage({ params }: PageProps) {
	const { slug } = await params

	// Render the main content for the entity built with the builder.
	return <Main slug={slug} />
}

export default GeneralPage
