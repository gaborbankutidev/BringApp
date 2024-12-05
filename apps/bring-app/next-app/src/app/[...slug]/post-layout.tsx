import { getEntity } from "@/bring/render"
import { env } from "@/env.mjs"
import { BiBulb } from "react-icons/bi"

type PostLayoutProps = { children?: React.ReactNode; slug: string | string[] }

const PostLayout = async ({ children, slug }: PostLayoutProps) => {
	const entity = await getEntity(slug)

	if (!entity) return null // TODO: handle this as an Internal Server Error

	return (
		<>
			<div className="flex items-center gap-4">
				<p className="text-14 uppercase tracking-wide text-purple-600 md:text-16 xl:text-20">
					Example WordPress Post
				</p>
			</div>

			<h1 className="mb-8 text-[48px] font-bold tracking-tight xl:text-[72px] xl:leading-[72px]">
				{entity.props.name}
			</h1>

			<div className="mb-4 flex w-fit items-center gap-2 rounded-2xl bg-gray-800/60 px-4 py-2">
				<BiBulb size={24} className="text-purple-400" />
				<p>
					You can edit this layout in{" "}
					<code>apps/bring-app/next-app/src/app/[...slug]/post-layout.tsx</code>
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
			<div className="rounded-lg border border-gray-500/60 bg-gray-800/60 px-4 py-8">
				{children}
			</div>
		</>
	)
}

export default PostLayout
