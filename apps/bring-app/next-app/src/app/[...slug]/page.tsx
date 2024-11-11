import { Main } from "@/bring/render"

const Slug = async (props: { params: Promise<{ slug: string | string[] }> }) => {
	const params = await props.params
	return <Main slug={params.slug} />
}

export default Slug
