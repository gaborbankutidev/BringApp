import {BP} from "@bring/blocks-client";

export type ParagraphProps = {
	text: string;
};

const Paragraph = ({text}: BP<ParagraphProps>) => {
	return <p className="p-10 w-full h-10">{text}</p>;
};

export const paragraph = {
	Component: Paragraph,
	componentName: "bring/paragraph",
} as const;

export default Paragraph;
