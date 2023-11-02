import React, {type ReactNode, type FC} from "react";
import type {BringNode} from "../types";

interface ErrorComponentInterface {
	name: string;
}

// TODO create a better error component
const Error: FC<ErrorComponentInterface> = ({name}) => (
	<div>Error while rendering {name}</div>
);

export default function createBringElement(
	nodes: BringNode[],
	componentMap: Map<string, FC<any>>,
	entityProps: any = {},
	siteProps: any = {},
	context: any = {},
	PostContent: ReactNode = null,
) {
	return nodes.map((node) => {
		// check if component is PostContent and return PostContent ReactNode
		if (node.component === "PostContent") {
			return PostContent;
		}

		// get component
		const Component = componentMap.get(node.component);

		// check if component is a function
		if (Component === undefined) {
			console.log(
				'Component is not a function, inserting "Error" component instead...',
			);
			return <Error name={node.component} key={node.key} />;
		}

		// render children
		const children = node.children?.length
			? createBringElement(
					node.children,
					componentMap,
					entityProps,
					siteProps,
					context,
					PostContent,
			  )
			: [];

		// create element
		return (
			<Component
				{...node.props}
				key={node.key}
				entityProps={entityProps}
				siteProps={siteProps}
				context={context}
			>
				{children}
			</Component>
		);
	});
}
