
import React from "react";

const PostContent = () => <div>Post content will be rendered here!</div>;
export default PostContent;

export const postContent = {
	Block: PostContent,
	blockName: "bring/post-content",
} as const;
