import {getEntity} from "@/bring/render";

type PostLayoutProps = {children?: React.ReactNode; slug: string | string[]};

const PostLayout = async ({children, slug}: PostLayoutProps) => {
	const entity = await getEntity(slug);

	if (!entity) return null; // TODO: handle this as an Internal Server Error

	return (
		<>
			<p className="uppercase tracking-wide text-14 md:text-16 xl:text-20 text-purple-600">
				Example post from WordPress
			</p>
			<h1 className="tracking-tight font-bold text-[48px] xl:text-[72px] xl:leading-[72px] mb-8">
				{entity.props.name}
			</h1>

			<p className="text-gray-200 mb-4">{entity.props.excerpt}</p>

			<p className="text-gray-200 mb-4">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque a
				blanditiis natus quibusdam corporis tempore velit numquam. Commodi,
				consequatur mollitia illo, non totam cumque minima suscipit hic fuga
				ratione maiores!
			</p>

			<div>{children}</div>
		</>
	);
};

export default PostLayout;
