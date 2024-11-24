import type {BP} from "@/bring";
import {cn} from "@/lib/utils";
import type {ColorType} from "@/styles/colors";

export type DividerBlockProps = {
	withLine?: boolean;
	lineColor?: ColorType;
	height?: number;
};

/**
 * Divider helps to apply up white space between blocks in the editor.
 */
const DividerBlock = ({
	withLine = false,
	lineColor = "border",
	height = 40,

	bringStylesClassNames,
	className,
	id,
}: BP<DividerBlockProps>) => {
	const classNames = cn("flex items-center", bringStylesClassNames?.classNames, className);

	return (
		<div className={classNames} style={{minHeight: `${height}px`}} id={id}>
			{withLine && <div className={`w-full border-b border-${lineColor}`} />}
		</div>
	);
};

export const divider = {
	Component: DividerBlock,
	componentName: "bring/divider",
} as const;

export default DividerBlock;
