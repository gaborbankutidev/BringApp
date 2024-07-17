import {getEntity} from "@/bring/render";

type PostLayoutProps = {children?: React.ReactNode; slug: string | string[]};

const PostLayout = async ({children, slug}: PostLayoutProps) => {
	const entity = await getEntity(slug);

	if (!entity) return null; // TODO: handle this as an Internal Server Error

	return (
		<div className="p-8">
			<h1>{entity.props.name}</h1>
			<p className="hl-1">Sample post layout, post content in is bellow</p>
			<div className="border border-brick">{children}</div>
		</div>
	);
};

export default PostLayout;
