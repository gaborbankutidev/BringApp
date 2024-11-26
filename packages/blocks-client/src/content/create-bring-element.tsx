import React, {type FC, type ReactNode} from "react";
import type {BringNode} from "../types";

/**
 * Represents the props of the error component.
 * @property name - The name of the component that encountered the error.
 */
interface ErrorComponentInterface {
	name: string;
}

/**
 * Error component to be rendered when there is an error while rendering a component.
 *
 * @param name - The name of the component that encountered the error.
 * @returns The React element representing the error component.
 */
const Error: FC<ErrorComponentInterface> = ({name}) => <div>Error while rendering {name}</div>;

/**
 * Creates a React element tree based on the provided BringNodes.
 *
 * @param nodes - An array of BringNodes representing the elements to be rendered.
 * @param blockMap - A map of block names to React components.
 * @param entityProps - Props to be passed to the entity components.
 * @param siteProps - Props to be passed to the site components.
 * @param context - Additional context to be passed to the components.
 * @param PostContent - The ReactNode representing the PostContent component.
 * @returns An array of React elements representing the rendered components.
 */
export default function createBringElement(
	nodes: BringNode[],
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	blockMap: Map<string, FC<any>>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	entityProps: any = {},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	siteProps: any = {},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	context: any = {},
	PostContent: ReactNode = null,
) {
	return nodes.map((node) => {
		// check if block is PostContent and return PostContent ReactNode
		if (node.blockName === "bring/post-content") {
			return PostContent;
		}

		// get component
		const Block = blockMap.get(node.blockName);

		// check if component is a function
		if (Block === undefined) {
			console.log('Block is not a function, inserting "Error" component instead...');
			return <Error name={node.blockName} key={node.key} />;
		}

		// render children
		const children = node.children?.length
			? createBringElement(
					node.children,
					blockMap,
					entityProps,
					siteProps,
					context,
					PostContent,
				)
			: [];

		// create element
		return (
			<Block
				// {...node.props}
				key={node.key}
				attributes={node.attributes}
				entityProps={entityProps}
				siteProps={siteProps}
				context={context}
			>
				{children}
			</Block>
		);
	});
}
