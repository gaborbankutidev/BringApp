import React, {useState} from "react";
import type {FC, ReactNode} from "react";

const editorColors = {
	blue: "#38bdf8",
	green: "#4ade80",
	lime: "#a3e635",
	orange: "#fb923c",
	grey: "#9ca3af",
} as const;

type EditorColorType = keyof typeof editorColors;

type EditorCardType = {
	children: ReactNode | ReactNode[];
	color: EditorColorType;
	name: string;
	isSelected?: boolean;
	showActions?: boolean;
};

export const EditorCard: FC<EditorCardType> = ({color, name, children, showActions = true}) => {
	const [showContent, setShowContent] = useState(true);

	return (
		<div
			style={{
				border: "2px solid",
				borderColor: editorColors[color],
				width: "100%",
				height: "100%",
				minHeight: "32px",
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
				{showActions && (
					<button
						onClick={() => {
							setShowContent(!showContent);
						}}
						style={{marginLeft: "4px"}}
					>
						{showContent ? "- Hide" : "- Show"}
					</button>
				)}
			</div>
			<div style={{display: showContent ? "block" : "none"}}>{children}</div>
			<div
				style={
					showContent
						? {display: "none"}
						: {
								textAlign: "center",
								padding: "16px",
								backgroundColor: editorColors[color],
								height: "100%",
							}
				}
			>
				{name}
			</div>
		</div>
	);
};
