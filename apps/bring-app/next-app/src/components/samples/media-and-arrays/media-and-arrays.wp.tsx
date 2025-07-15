import {
	arrayAttributeSource,
	imageAttributeSource,
	mediaAttributeSource,
	type BlockConfig,
} from "@bring/blocks-editor/blocks"
import {
	ImageArrayControl,
	ImageControl,
	MediaControl,
	TextArrayControl,
} from "@bring/blocks-editor/controls"
import { mediaAndArrays, type MediaAndArraysBlockProps } from "./media-and-arrays.block"
import { GalleryWithCaptionControl } from "./media-and-arrays.controls"

const mediaAndArraysConfig: BlockConfig<MediaAndArraysBlockProps> = {
	...mediaAndArrays,
	title: "Media and Arrays Sample Block",
	description: "This is a test and sample block for media and arrays props and features",
	icon: "art",
	attributes: {
		image: imageAttributeSource(),
		file: mediaAttributeSource(),
		list: arrayAttributeSource([]),
		gallery: arrayAttributeSource([]),
		galleryWithCaption: arrayAttributeSource([]),
	},
	Controls: [
		{
			panel: "Media and Arrays - Controls object",
			controls: [
				{
					type: "image",
					label: "Image",
					path: "image",
				},
				/**
				 * Use the media control for selecting any type of media file.
				 * You can restrict selectable media types by providing the allowedTypes prop.
				 * Example: allowedTypes: ["image", "video", "audio"]
				 */
				{
					type: "media",
					label: "File",
					path: "file",
				},
				/**
				 * There are two main types of array controls:
				 * 1. Arrays of primitive values or images (e.g., string, number, boolean, or image)
				 * 2. Arrays of objects with multiple fields (e.g., { image, caption })
				 *
				 * For the first type, you can use the built-in "text-array" or "image-array" controls,
				 * or create a custom array control for other primitive types using makeArrayControl.
				 * Example:
				 *   const TextArrayControl = makeArrayControl<string>({
				 *     Control: TextControl,
				 *     defaultItem: "",
				 *   })
				 *
				 * The label is optional, as array controls are often placed alone in a panel.
				 * Note: setDefault is not available for array controls to avoid undefined values.
				 * Instead of defaultValue, use defaultItem when creating the control with makeArrayControl.
				 *
				 * For the second type (arrays of objects), use makeArrayControl to define a custom array control
				 * with object items. See the .controls.tsx file for more details and examples.
				 */
				{
					type: "text-array",
					label: "List",
					path: "list",
				},
				{
					type: "image-array",
					label: "Gallery",
					path: "gallery",
				},
			],
			initialOpen: false,
		},
		{
			panel: "Media and Arrays - Components by path",
			controls: [
				/**
				 * All controls from the previous panel can also be rendered here using their corresponding control components.
				 * You may specify the data path or provide values directly, depending on your requirements.
				 */
				() => <ImageControl<MediaAndArraysBlockProps> path="image" label="Image" />,
				() => <MediaControl<MediaAndArraysBlockProps> path="file" label="File" />,
				() => <TextArrayControl<MediaAndArraysBlockProps> path="list" label="List" />,
				() => <ImageArrayControl<MediaAndArraysBlockProps> path="gallery" label="Gallery" />,
			],
		},
		{
			panel: "Media and Arrays - Components by value",
			controls: [
				/**
				 * All controls from the previous panel can also be rendered by using their value and setValue props.
				 * You may specify the data path or provide values directly, depending on your requirements.
				 */
				({ attributes, setAttributes }) => (
					<ImageControl
						updateHandling="by-value"
						label="Image"
						value={attributes.image}
						setValue={(value) => setAttributes({ image: value })}
					/>
				),
				({ attributes, setAttributes }) => (
					<MediaControl
						updateHandling="by-value"
						label="File"
						value={attributes.file}
						setValue={(value) => setAttributes({ file: value })}
					/>
				),
				({ attributes, setAttributes }) => (
					<TextArrayControl
						updateHandling="by-value"
						label="List"
						value={attributes.list}
						setValue={(value) => setAttributes({ list: value })}
					/>
				),
				({ attributes, setAttributes }) => (
					<ImageArrayControl
						updateHandling="by-value"
						label="Gallery"
						value={attributes.gallery}
						setValue={(value) => setAttributes({ gallery: value })}
					/>
				),
			],
		},
		{
			panel: "Object Arrays - Components by path",
			controls: [
				/**
				 * For array with object, use the makeArrayControl to create a custom array control.
				 * See the .controls.tsx file for more details and examples.
				 * The created control can be used by path or by value.
				 */
				() => (
					<GalleryWithCaptionControl<MediaAndArraysBlockProps>
						label="Gallery with Caption"
						path="galleryWithCaption"
					/>
				),
			],
		},
		{
			panel: "Object Arrays - Components by value",
			controls: [
				/**
				 * For array with object, use the makeArrayControl to create a custom array control.
				 * See the .controls.tsx file for more details and examples.
				 * The created control can be used by path or by value.
				 */
				({ attributes, setAttributes }) => (
					<GalleryWithCaptionControl
						updateHandling="by-value"
						label="Gallery with Caption"
						value={attributes.galleryWithCaption}
						setValue={(value) => setAttributes({ galleryWithCaption: value })}
					/>
				),
			],
		},
	],
}

export default mediaAndArraysConfig
