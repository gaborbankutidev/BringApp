import Markdown from "@/components/markdown";

export default function Home() {
	const content = `hello ${process.env.NODE_ENV}`;
	return (
		<>
			<Markdown>{content}</Markdown>
		</>
	);
}
