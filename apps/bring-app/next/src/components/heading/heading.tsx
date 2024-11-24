import {cn} from "@/lib/utils";
//import Markdown from "../markdown";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = {
	level?: HeadingLevel;
	children: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

const Heading = ({children, level = 2, className, ...props}: HeadingProps) => {
	const H = `h${level}` as const;

	return (
		<H className={cn("text-primary", className)} {...props}>
			{/* <Markdown content={children} inline /> */}
			{children}
		</H>
	);
};

export default Heading;
