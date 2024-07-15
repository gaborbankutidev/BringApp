import {Main} from "@/bring/render";

const Slug = ({params}: {params: {slug: string | string[]}}) => {
	return <Main slug={params.slug} />;
};

export default Slug;
