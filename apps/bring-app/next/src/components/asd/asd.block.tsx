import type {BP} from "@/bring";
import Markdown from "react-markdown";

export type AsdBlockProps = {};

export const AsdBlock = ({bringStylesClassNames, className, id}: BP<AsdBlockProps>) => {
	return <Markdown>This is **random** markdown</Markdown>;
};

export const asd = {
	Component: AsdBlock,
	componentName: "bring/asd",
} as const;

export default AsdBlock;
