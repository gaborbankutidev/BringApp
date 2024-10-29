import {
	MarkdownBlock as Markdown,
	type MarkdownBlockProps as MarkdownProps,
} from "@/components/markdown";
import type {BlockEdit} from "@bring/blocks-editor";
import {BlockControls} from "@wordpress/block-editor";
import {ToolbarButton, ToolbarGroup} from "@wordpress/components";
import type SimpleMDE from "easymde";
import {
	drawHorizontalRule,
	drawImage,
	drawLink,
	redo,
	toggleBlockquote,
	toggleBold,
	toggleCodeBlock,
	toggleHeadingSmaller,
	toggleItalic,
	toggleOrderedList,
	toggleStrikethrough,
	toggleUnorderedList,
	undo,
	type Options,
} from "easymde";
import {useCallback, useMemo, useState} from "react";
import SimpleMDEReact from "react-simplemde-editor";

const MarkdownEdit: BlockEdit<MarkdownProps> = ({
	attributes,
	setAttributes,
}) => {
	const {content, source = "manual", ...props} = attributes;

	const [isPreview, setPreview] = useState(false);

	const onChange = useCallback((newValue: string) => {
		setAttributes({content: newValue});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// MDE instance
	const [simpleMdeInstance, setMdeInstance] = useState<SimpleMDE | null>(null);

	const getMdeInstanceCallback = useCallback((simpleMde: SimpleMDE) => {
		setMdeInstance(simpleMde);
	}, []);

	// MDE options
	const options: Options = useMemo(() => {
		return {
			toolbar: false,
			spellChecker: false,
		};
	}, []);

	return source !== "manual" ? (
		<Markdown {...props} content={`${source} will be here...`} />
	) : isPreview ? (
		<>
			<BlockControls controls={undefined}>
				<ToolbarGroup>
					<ToolbarButton
						icon="edit"
						onClick={() => {
							setPreview(false);
						}}
						onPointerOverCapture={undefined}
						onPointerOutCapture={undefined}
						// @ts-ignore
						placeholder={undefined}
					/>
				</ToolbarGroup>
			</BlockControls>
			<Markdown {...props} content={content ?? ""} />
		</>
	) : (
		<>
			<BlockControls controls={undefined}>
				<ToolbarGroup>
					<ToolbarButton
						icon="undo"
						onClick={() => {
							simpleMdeInstance && undo(simpleMdeInstance);
						}}
						onPointerOverCapture={undefined}
						onPointerOutCapture={undefined}
						// @ts-ignore
						placeholder={undefined}
					/>
					<ToolbarButton
						icon="redo"
						onClick={() => {
							simpleMdeInstance && redo(simpleMdeInstance);
						}}
						onPointerOverCapture={undefined}
						onPointerOutCapture={undefined}
						// @ts-ignore
						placeholder={undefined}
					/>

					<ToolbarButton
						icon="visibility"
						onClick={() => {
							setPreview(true);
						}}
						onPointerOverCapture={undefined}
						onPointerOutCapture={undefined}
						// @ts-ignore
						placeholder={undefined}
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton
						icon="heading"
						onClick={() => {
							simpleMdeInstance && toggleHeadingSmaller(simpleMdeInstance);
						}}
						onPointerOverCapture={undefined}
						onPointerOutCapture={undefined}
						// @ts-ignore
						placeholder={undefined}
					/>

					<ToolbarButton
						icon="editor-bold"
						onClick={() => {
							simpleMdeInstance && toggleBold(simpleMdeInstance);
						}}
						onPointerOverCapture={undefined}
						onPointerOutCapture={undefined}
						// @ts-ignore
						placeholder={undefined}
					/>
					<ToolbarButton
						icon="editor-italic"
						onClick={() => {
							simpleMdeInstance && toggleItalic(simpleMdeInstance);
						}}
						onPointerOverCapture={undefined}
						onPointerOutCapture={undefined}
						// @ts-ignore
						placeholder={undefined}
					/>
					<ToolbarButton
						icon="editor-strikethrough"
						onClick={() => {
							simpleMdeInstance && toggleStrikethrough(simpleMdeInstance);
						}}
						onPointerOverCapture={undefined}
						onPointerOutCapture={undefined}
						// @ts-ignore
						placeholder={undefined}
					/>
					<ToolbarButton
						icon="admin-links"
						onClick={() => {
							simpleMdeInstance && drawLink(simpleMdeInstance);
						}}
						onPointerOverCapture={undefined}
						onPointerOutCapture={undefined}
						// @ts-ignore
						placeholder={undefined}
					/>

					<ToolbarButton
						icon="editor-ul"
						onClick={() => {
							simpleMdeInstance && toggleUnorderedList(simpleMdeInstance);
						}}
						onPointerOverCapture={undefined}
						onPointerOutCapture={undefined}
						// @ts-ignore
						placeholder={undefined}
					/>
					<ToolbarButton
						icon="editor-ol-rtl"
						onClick={() => {
							simpleMdeInstance && toggleOrderedList(simpleMdeInstance);
						}}
						onPointerOverCapture={undefined}
						onPointerOutCapture={undefined}
						// @ts-ignore
						placeholder={undefined}
					/>

					<ToolbarButton
						icon="minus"
						onClick={() => {
							simpleMdeInstance && drawHorizontalRule(simpleMdeInstance);
						}}
						onPointerOverCapture={undefined}
						onPointerOutCapture={undefined}
						// @ts-ignore
						placeholder={undefined}
					/>
					<ToolbarButton
						icon="format-image"
						onClick={() => {
							simpleMdeInstance && drawImage(simpleMdeInstance);
						}}
						onPointerOverCapture={undefined}
						onPointerOutCapture={undefined}
						// @ts-ignore
						placeholder={undefined}
					/>
					<ToolbarButton
						icon="editor-quote"
						onClick={() => {
							simpleMdeInstance && toggleBlockquote(simpleMdeInstance);
						}}
						onPointerOverCapture={undefined}
						onPointerOutCapture={undefined}
						// @ts-ignore
						placeholder={undefined}
					/>
					<ToolbarButton
						icon="editor-code"
						onClick={() => {
							simpleMdeInstance && toggleCodeBlock(simpleMdeInstance);
						}}
						onPointerOverCapture={undefined}
						onPointerOutCapture={undefined}
						// @ts-ignore
						placeholder={undefined}
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton
						icon="trash"
						onClick={() => {
							onChange("");
						}}
						onPointerOverCapture={undefined}
						onPointerOutCapture={undefined}
						// @ts-ignore
						placeholder={undefined}
					/>
				</ToolbarGroup>
			</BlockControls>
			<SimpleMDEReact
				value={content ?? ""}
				onChange={onChange}
				getMdeInstance={getMdeInstanceCallback}
				options={options}
			/>
		</>
	);
};

export default MarkdownEdit;
