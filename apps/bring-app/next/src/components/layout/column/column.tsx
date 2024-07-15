import {twMerge} from "@/utils";
import type {ReactNode} from "react";

export type ColumnProps = {
	children?: ReactNode;
	className?: string;
} & React.HTMLProps<HTMLDivElement>;

const baseStyle = "relative flex flex-col h-full";

const Column = ({children, className, ...props}: ColumnProps) => {
	return (
		<div className={twMerge(baseStyle, className)} {...props}>
			{children}
		</div>
	);
};

export default Column;
