import React from "react";
import type {FC, ReactNode} from "react";
import type {BringNode} from "./types";

interface ErrorComponentInterface {
	name: string;
}

const Error: FC<ErrorComponentInterface> = ({name}) => (
	<div>Error while rendering {name}</div>
);

export function createBringElement(
	nodes: BringNode[],
	componentMap: Map<string, FC<any>>,
	isPostContentAllowed: boolean = false,
) {
	return nodes.map((node) => {
		const Component = componentMap.get(node.component);

		// check if component is a function
		if (Component === undefined) {
			console.log(
				'Component is not a function, inserting "Error" component instead...',
			);
			return <Error name={node.component} key={node.key} />;
		}

		// if PostContent is not allowed skip PostContent
		if (!isPostContentAllowed && node.component === "PostContent") {
			return null;
		}

		// render children
		const children = node.children?.length
			? createBringElement(node.children, componentMap, isPostContentAllowed)
			: [];

		// create element
		return (
			<Component {...node.props} key={node.key}>
				{children}
			</Component>
		);
	});
}
