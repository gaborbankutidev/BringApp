import {twMerge} from "@/utils";
import {type FC} from "react";
import Markdown from "../markdown";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = {
	level?: HeadingLevel;
	children: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

const Heading: FC<HeadingProps> = ({
	children,
	level = 2,
	className,
	...props
}) => {
	const H = `h${level}` as const;

	return (
		<H className={twMerge("text-primary", className)} {...props}>
			<Markdown content={children} inline />
		</H>
	);
};

export default Heading;
