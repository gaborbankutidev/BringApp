import React from "react"
import type { BlockConfig } from "../.."
import { EditorCard } from "../../components"
import { postContent } from "./post-content"

export const postContentConfig: BlockConfig = {
	...postContent,
	title: "Post Content",
	description: "Post content will be rendered were this component is used in the layout.",
	icon: "admin-page",
	Edit: () => (
		<EditorCard color="grey" name="PostContent">
			<h1>Example Post Content</h1>
			<h2>The post content will be rendered here.</h2>
			<p>
				You can use this component to render the content of a post. The content will be rendered
				where this component is used in the layout.
			</p>
		</EditorCard>
	),
}
