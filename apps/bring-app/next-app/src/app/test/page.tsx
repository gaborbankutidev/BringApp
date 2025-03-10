import { Main } from "@/bring/render"
import { Preview } from "./preview"

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
	return (
		<div className="dark">
			<Preview />
			<h1>Preview test</h1>
			<div className="border p-4">
				<Main slug="test-post" />
			</div>
		</div>
	)
}

export default GeneralPage
