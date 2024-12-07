import { getEntity } from "@/bring/render"
import Column from "@/components/layout/column"
import Row from "@/components/layout/row"
import Section from "@/components/layout/section"
import { env } from "@/env.mjs"
import { BiBulb } from "react-icons/bi"

type PostLayoutProps = {
	slug: string | string[]
	children?: React.ReactNode
}

async function PostLayout({ slug, children }: PostLayoutProps) {
	const entity = await getEntity(slug)
	if (!entity) return null // TODO: handle this as an Internal Server Error

	return (
		<Section dark>
			<Row size="split">
				<Column>
					<div className="flex items-center gap-4">
						<p className="text-14 uppercase tracking-wide text-purple-600 md:text-16 xl:text-20">
							Example WordPress Post
						</p>
					</div>
					<h1 className="mb-8 text-[48px] font-bold tracking-tight text-white xl:text-[72px] xl:leading-[72px]">
						{entity.props.name}
					</h1>
					<div className="mb-4 flex w-fit items-center gap-2 rounded-2xl bg-gray-800/60 px-4 py-2">
						<BiBulb size={24} className="text-purple-400" />
						<p>
							You can edit this layout in{" "}
							<code>apps/bring-app/next/src/app/[...slug]/post-layout.tsx</code>
						</p>
					</div>
					<div className="mb-4 flex w-fit items-center gap-2 rounded-2xl bg-gray-800/60 px-4 py-2">
						<BiBulb size={24} className="text-purple-400" />
						<p>
							You can edit the content of this post in the{" "}
							<a
								target="_blank"
								rel="noreferrer"
								href={`${env.NEXT_PUBLIC_WP_BASE_URL}/wp-admin/post.php?post=${entity.id}&action=edit`}
							>
								<code>Wordpress block editor</code>
							</a>
						</p>
					</div>
					<p className="mb-2 mt-4 text-14 text-purple-600">Post content built with Wordpress</p>
					<div className="rounded-lg border px-4 py-8">{children}</div>
				</Column>
			</Row>
		</Section>
	)
}

export default PostLayout
