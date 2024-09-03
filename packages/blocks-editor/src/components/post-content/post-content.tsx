import React from "react";

const PostContent = () => <div>Post content will be rendered here!</div>;
export default PostContent;

export const postContent = {
	Component: PostContent,
	componentName: "bring/post-content",
} as const;
