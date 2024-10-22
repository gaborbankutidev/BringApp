import {stringAttributeSource, type BlockConfig} from "@bring/blocks-editor";
import {useBlockProps} from "@wordpress/block-editor";
import {dispatch} from "@wordpress/data";
import {useEffect} from "react";
import {paragraph, type ParagraphProps} from "./paragraph";

const paragraphConfig: BlockConfig<ParagraphProps> = {
	...paragraph,
	title: "Paragraph",
	attributes: {
		text: stringAttributeSource(),
	},
	// eslint-disable-next-line react/prop-types
	Edit: ({attributes, setAttributes, clientId}) => {
		// TODO textarea height (non resizable; auto height)
		const blockProps = useBlockProps();
		useEffect(() => {
			const handleKeyDown = (event: KeyboardEvent) => {
				if (event.key === "/") {
					event.preventDefault();
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					(dispatch("core/block-editor") as any).showInsertionPoint();
				}
			};

			window.addEventListener("keydown", handleKeyDown);
			return () => window.removeEventListener("keydown", handleKeyDown);
		}, [clientId]);

		// eslint-disable-next-line react/prop-types
		return (
			<textarea
				{...blockProps}
				className="w-full border-none focus:ring-0 text-18s px-0"
				autoFocus
				defaultValue={attributes.text}
				placeholder="Type / to choose a block"
				onChange={(e) => setAttributes({text: e.target.value})}
			></textarea>
		);
	},
	// Controls: [],
};

export default paragraphConfig;
