import React from "react";
import {postContent} from "@bring/blocks-client";
import type {BlockConfig} from "..";
import {EditorCard} from "../components";

export const postContentConfig: BlockConfig = {
	...postContent,
	description:
		"Post content will be rendered were this component is used in the layout.",
	icon: "admin-page",
	Edit: ({isSelected = false}) => (
		<EditorCard color="grey" name="PostContent" isSelected={isSelected}>
			<div>Post Content will be rendered here.</div>
		</EditorCard>
	),
};
