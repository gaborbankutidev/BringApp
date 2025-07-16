import { defaultImageValue } from "@bring/blocks-client"
import { ImageControl, makeArrayControl, TextControl } from "@bring/blocks-editor/controls"
import type { GalleryWithCaptionItemType } from "./media-and-arrays.block"

/**
 * To create controls for arrays of objects, use `makeArrayControl` to define a custom array control component.
 * `makeArrayControl` accepts a `Control` property—a function that renders the control UI for each array item—
 * and a `defaultItem` property, which specifies the default value for new items in the array.
 * Be sure to provide the array item type as a generic type parameter to ensure proper type checking.
 *
 * Controls can be provided either by value or by path.
 * When using path-based controls, utilize the `index` prop to indicate the position of the item within the array.
 */
export const GalleryWithCaptionControl = makeArrayControl<GalleryWithCaptionItemType>({
	Control: ({ value, setValue, label, index }) => (
		<>
			{/* Controls can be specified by value. */}
			<ImageControl
				label={`${label} - Image`}
				value={value?.image}
				updateHandling="by-value"
				setValue={(newValue = defaultImageValue) => {
					const newObject = { ...value }
					newObject.image = newValue
					setValue(newObject as GalleryWithCaptionItemType)
				}}
			/>
			{/* Controls can be specified by path. */}
			<TextControl label={`${label} - Caption`} path={`galleryWithCaption.${index}.caption`} />
		</>
	),
	defaultItem: {
		image: defaultImageValue,
		caption: "Sample caption",
	},
})
