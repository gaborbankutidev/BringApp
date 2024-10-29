import {addFilter} from "@wordpress/hooks";
import React from "react";
import {BlockConfig, objectAttributeSource, stringAttributeSource} from "./blocks";
import {BP} from "./client-types";
import {BringStylesDefaultValue} from "./styles/utils";

export type ParagraphProps = {
	content: string;
};

export const Paragraph = ({content}: BP<ParagraphProps>) => {
	return <p className="text-gray-700 text-base">{content}</p>;
};

const paragraph = {
	Component: Paragraph,
	componentName: "core/paragraph",
};
export default paragraph;

export const paragrapgConfig: BlockConfig<ParagraphProps> = {
	componentName: "core/paragraph",
	Component: ({content}: {content: string}) => {
		return <p>BRING-{content}-BRING</p>;
	},
	attributes: {
		content: stringAttributeSource(),
	},
};

export const pocUseDefault = () => {
	console.log("pocUseDefault");
	addFilter(
		"blocks.registerBlockType",
		"bring/test",
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(settings: any, name: any) => {
			if (name !== "core/paragraph") {
				return settings;
			}

			console.log("addListBlockClassName", settings, name);
			return {
				...settings,
				title: "Anyad",
				// name: "core/paragraph",
				supports: {
					html: false,
				},
				attributes: {
					...paragrapgConfig.attributes,
					id: stringAttributeSource(),
					bringStyles: objectAttributeSource(BringStylesDefaultValue),
				},
				example: paragrapgConfig.previewAttributes && {
					attributes: paragrapgConfig.previewAttributes,
				},
				// edit: makeEdit<ParagraphProps>(paragrapgConfig),
				// save: makeSave<ParagraphProps>(paragrapgConfig),
			};
		},
		10,
	);
};
