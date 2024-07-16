import React from "react";
import type {BlockConfig} from "..";
import {EditorCard} from "../components";

export const postContentConfig: BlockConfig = {
	componentName: "PostContent",
	Component: () => <div>Post content will be rendered here!</div>,
	description: "Post content will be rendered were this component is used in the layout.",
	icon: "admin-page",
	Edit: () => (
		<EditorCard color="grey" name="PostContent">
			<div>Post Content will be rendered here.</div>
		</EditorCard>
	),
};
