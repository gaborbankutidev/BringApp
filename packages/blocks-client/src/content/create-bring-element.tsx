
import {clsx} from "clsx";
import React, {type FC, type ReactNode} from "react";
import {makeBlockStylesClassNames} from "../styles/make-class-names";
import type {BlockList, BringNode, EntityProps, SiteProps} from "../types";

/**
 * Represents the props of the error component.
 * @property name - The name of the component that encountered the error.
 */
interface ErrorComponentInterface {
	name: string
}

/**
 * Error component to be rendered when there is an error while rendering a component.
 *
 * @param name - The name of the component that encountered the error.
 * @returns The React element representing the error component.
 */
const Error: FC<ErrorComponentInterface> = ({ name }) => <div>Error while rendering {name}</div>

/**
 * Creates a React element tree based on the provided BringNodes.
 *
 * @param nodes - An array of BringNodes representing the elements to be rendered.
 * @param blockList - List of Block configs.
 * @param entityProps - Props to be passed to the entity components.
 * @param siteProps - Props to be passed to the site components.
 * @param context - Additional context to be passed to the components.
 * @param PostContent - The ReactNode representing the PostContent component.
 * @returns An array of React elements representing the rendered components.
 */
export default function createBringElement<
	EP = object,
	SP = object,
	M = object,
	MI = object,
	CTX = object,
>(
	nodes: BringNode[],
	blockList: BlockList<EP, SP, M, MI, CTX>,
	entityProps: EntityProps<EP>,
	siteProps: SiteProps<SP, M, MI>,
	context: CTX,
	PostContent: ReactNode = null,
) {
	return nodes.map((node) => {
		// check if block is PostContent and return PostContent ReactNode
		if (node.blockName === "bring/post-content") {
			return PostContent;
		}

		// Find block
		const {Block, blockStylesConfig} =
			blockList.find((blockListItem) => blockListItem.blockName === node.blockName) ?? {};

		// check if component is a function
		if (Block === undefined) {
			console.log('Block is not a function, inserting "Error" component instead...');
			return <Error name={node.blockName} key={node.key} />;
		}

		// render children
		const children = node.children?.length
			? createBringElement<EP, SP, M, MI, CTX>(
					node.children,
					blockList,
					entityProps,
					siteProps,
					context,
					PostContent
				)
			: []

		// create element
		const {className, blockStyles, ...attributes} = node.attributes;
		const blockStylesClassNames = makeBlockStylesClassNames(
			className,
			blockStylesConfig,
			blockStyles,
		);

		return (
			<Block
				key={node.key}
				attributes={{
					className: clsx(
						blockStylesClassNames.spacing?.m,
						blockStylesClassNames.spacing?.p,
						blockStylesClassNames.visibility,
						blockStylesClassNames.className,
					),
					...attributes,
				}}
				entityProps={entityProps}
				siteProps={siteProps}
				context={context}
				blockStyles={blockStyles}
				blockStylesConfig={blockStylesConfig}
				blockStylesClassNames={blockStylesClassNames}
			>
				{children}
			</Block>
		);
	});
}
