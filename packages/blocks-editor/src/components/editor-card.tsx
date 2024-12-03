import type {FC, ReactNode} from "react";
import React from "react";

const editorColors = {
	blue: "#38bdf8",
	green: "#4ade80",
	lime: "#a3e635",
	orange: "#fb923c",
	amber: "#fbbf24",
	grey: "#9ca3af",
} as const;

type EditorColorType = keyof typeof editorColors;

type EditorCardType = {
	children: ReactNode | ReactNode[];
	color?: EditorColorType;
	name: string;
	isSelected?: boolean;
};

export const EditorCard: FC<EditorCardType> = ({color = "grey", name, children, isSelected}) => {
	return (
		<div
			style={{
				border: "2px solid",
				borderColor: isSelected ? editorColors[color] : "transparent",
				width: "100%",
				height: "100%",
				minHeight: "28px",
			}}
		>
			<div
				style={{
					position: "absolute",
					color: "white",
					fontSize: "0.875rem",
					lineHeight: "1.25rem",
					padding: "4px",
					backgroundColor: editorColors[color],
					display: "flex",
					zIndex: 20,
					right: 0,
					top: 0,
				}}
			>
				<div>{name}</div>
			</div>
			<div>{children}</div>
		</div>
	);
};
