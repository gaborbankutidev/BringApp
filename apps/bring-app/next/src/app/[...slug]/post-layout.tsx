import {getEntity} from "@/bring/render";
import {BiBulb, BiEdit} from "react-icons/bi";

type PostLayoutProps = {children?: React.ReactNode; slug: string | string[]};

const PostLayout = async ({children, slug}: PostLayoutProps) => {
	const entity = await getEntity(slug);

	if (!entity) return null; // TODO: handle this as an Internal Server Error

	return (
		<>
			<div className="flex gap-4 items-center">
				<p className="uppercase tracking-wide text-14 md:text-16 xl:text-20 text-purple-600">
					Example post from WordPress
				</p>

				<a
					href={entity.props.editUrl ?? "#"}
					className="flex items-center justify-center gap-1 text-gray-300 hover:text-purple-600 transition-all duration-300"
				>
					<BiEdit /> Edit post
				</a>
			</div>

			<h1 className="tracking-tight font-bold text-[48px] xl:text-[72px] xl:leading-[72px] mb-8">
				{entity.props.name}
			</h1>

			<div className="flex w-fit items-center gap-2 py-2 px-4 bg-gray-800/60 rounded-md mb-4">
				<BiBulb size={24} className="text-purple-400" />
				<p>
					You can edit this layout in{" "}
					<code>apps/bring-app/next/src/app/[...slug]/post-layout.tsx</code>
				</p>
			</div>

			<div className="bg-gray-800/60 border border-gray-500/60 px-4 py-8 rounded-lg">
				<p className="text-14 text-purple-600 mb-2">
					This is where the post content goes
				</p>

				<div>{children}</div>
			</div>
		</>
	);
};

export default PostLayout;
