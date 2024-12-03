import {InnerBlocks, InspectorAdvancedControls} from "@wordpress/block-editor";
import clsx from "clsx";
import React from "react";
import {EditorCard} from "../components";
import {TextControl} from "../controls";
import {ControlContextProvider} from "../controls/context";
import {makeBlockStylesClassNames, makeBlockStylesControl} from "../styles";
import {makeControls} from "./make-controls";
import type {BlockConfig, BlockEdit, EditorAttributes} from "./types";

type EditForRegisterType = {
	attributes: EditorAttributes;
	setAttributes: (attributes: Partial<EditorAttributes>) => void;
	isSelected?: boolean;
	clientId: string;
};

const sampleEntityProps = {
	entityType: null,
	entitySlug: null,
	entityId: 0,
	slug: "sample-entity-slug",
	url: "/sample-entity-slug",
	editUrl: null,

	name: "Sample entity name",
	excerpt: "Sample entity excerpt - lorem ipsum dolor sit amet",
	description: "Sample entity description - lorem ipsum dolor sit amet",
	image: {
		id: 0,
		src: "https://picsum.photos/1200/900",
		alt: "Sample image",
	},
};

const sampleSiteProps = {
	menus: [
		{
			id: 1,
			name: "header menu links",
			items: [
				{
					id: 1,
					name: "Home",
					url: "/",
				},
				{
					id: 2,
					name: "About",
					url: "/about",
				},
			],
		},
	],
	menuLocations: [
		{
			key: "headerMenu",
			menuId: 1,
		},
	],
};

const DefaultEdit: BlockEdit = ({blockProps, blockTitle, Block, isSelected}) => (
	<EditorCard name={blockTitle} isSelected={isSelected}>
		<Block {...blockProps} />
	</EditorCard>
);

export function makeEdit({
	title: blockTitle,
	blockName,
	allowedBlocks,
	Block,
	Controls,
	Edit = DefaultEdit,
	blockStylesConfig,
}: BlockConfig) {
	const EditForRegister = ({
		attributes: editorAttributes,
		setAttributes,
		clientId,
		isSelected,
	}: EditForRegisterType) => {
		const {className, blockStyles, ...restOfAttributes} = editorAttributes;
		const blockStylesClassNames = makeBlockStylesClassNames(
			className,
			blockStylesConfig,
			blockStyles,
		);
		const clientClassNames = clsx(
			blockStylesClassNames.spacing?.m,
			blockStylesClassNames.spacing?.p,
			blockStyles.visibility?.[""] && "opacity-50",
			blockStyles.visibility?.md && "opacity-50",
			blockStyles.visibility?.lg && "opacity-50",
			blockStylesClassNames.className,
		);
		const clientAttributes = {...restOfAttributes, className: clientClassNames};

		return (
			<ControlContextProvider attributes={editorAttributes} setAttributes={setAttributes}>
				{/* Add id to advanced controls */}
				<InspectorAdvancedControls>
					<TextControl
						updateHandling="by-value"
						label="Id"
						value={editorAttributes.id}
						setValue={(newValue) => {
							setAttributes({id: newValue} as Partial<EditorAttributes>);
						}}
					/>
				</InspectorAdvancedControls>

				{/* Render controls */}
				{Controls && makeControls(editorAttributes, setAttributes, Controls)}

				{/* Render block styles controls */}
				{blockStylesConfig && makeBlockStylesControl(blockStylesConfig)}

				{/* Render edit view */}
				<Edit
					blockTitle={blockTitle ?? blockName}
					blockProps={{
						attributes: clientAttributes,
						children: <InnerBlocks allowedBlocks={allowedBlocks} />,
						entityProps: sampleEntityProps,
						siteProps: sampleSiteProps,
						blockStyles: editorAttributes.blockStyles,
						blockStylesConfig,
						blockStylesClassNames: blockStylesClassNames,
					}}
					Block={Block}
					setAttributes={setAttributes}
					clientId={clientId}
					isSelected={isSelected ?? false}
				/>
			</ControlContextProvider>
		);
	};

	return EditForRegister;
}
