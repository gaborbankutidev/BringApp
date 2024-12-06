import {cn} from "@/lib/utils";
import type {ReactNode} from "react";

export type ColumnProps = {
	children?: ReactNode;
	className?: string;
} & React.HTMLProps<HTMLDivElement>;

const baseStyle = "relative flex flex-col h-full";

/**
 * The column is a building block with flex layout for the grid layout provided by the Row component.
 * While creating pages in next it is not necessary to use.
 * As a block in editor it is essential to build the layout.
 */
const Column = ({children, className, ...props}: ColumnProps) => {
	return (
		<div className={cn(baseStyle, className)} {...props}>
			{children}
		</div>
	);
};

export default Column;
