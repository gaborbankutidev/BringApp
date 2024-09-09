import type {BP} from "@/bring";
import type {ColorType} from "@/styles";
import {twMerge} from "@/utils";

export type DividerProps = {
	withLine?: boolean;
	lineColor?: ColorType;
	height?: number;
};

const Divider = ({
	withLine = false,
	lineColor = "neutral",
	height = 40,

	bringStylesClassNames,
	className,
	id,
}: BP<DividerProps>) => {
	const classNames = twMerge(
		"flex items-center",
		bringStylesClassNames?.classNames,
		className,
	);

	return (
		<div className={classNames} style={{minHeight: `${height}px`}} id={id}>
			{withLine && <div className={`w-full border-b border-${lineColor}`} />}
		</div>
	);
};

export const divider = {
	Component: Divider,
	componentName: "bring/divider",
} as const;

export default Divider;
