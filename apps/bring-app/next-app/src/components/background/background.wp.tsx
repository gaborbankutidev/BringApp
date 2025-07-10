import { colorOptions } from "@/editor/utils/options"
import { type ColorType } from "@/styles/colors"
import type { ImageType, ResponsiveValue } from "@bring/blocks-client"
import {
	booleanAttributeSource,
	objectAttributeSource,
	stringAttributeSource,
	type BlockConfig,
} from "@bring/blocks-editor/blocks"
import { type BackgroundBlockProps } from "./background.block"

type Options =
	| {
			defaultBackgroundColor?: ColorType
			withParallax?: boolean
			withGradient?: boolean
	  }
	| undefined

/**
 * Background wp config
 *
 * This function is used to create a wp config for a block with the background wrapper component.
 * Use this function to create the attributes and controls for the block.
 *
 * @param defaultBackgroundColor - the default background color (optional)
 * @param withParallax - if true, parallax attribute and controls will be added (optional)
 * @param withGradient - if true, gradient attribute and controls will be added (optional)
 * @returns - the attributes and controls for the block
 */
const background = ({
	defaultBackgroundColor,
	withParallax = false,
	withGradient = false,
}: Options = {}) => {
	const hasBackgroundImage = (backgroundImage?: ResponsiveValue<ImageType>) =>
		!!backgroundImage?.[""]?.src || !!backgroundImage?.md?.src || !!backgroundImage?.lg?.src

	// Attributes
	const backgroundAttributes: BlockConfig<BackgroundBlockProps>["attributes"] = {
		backgroundColor: stringAttributeSource(),
		backgroundImage: objectAttributeSource({}),
		backgroundImageClassName: stringAttributeSource(),
		backgroundClassName: stringAttributeSource(),
		containerClassName: stringAttributeSource(),
	}

	if (withParallax) {
		backgroundAttributes.parallax = booleanAttributeSource()
	}

	if (withGradient) {
		backgroundAttributes.gradient = booleanAttributeSource()
	}

	// Panels
	const backgroundControls: BlockConfig<BackgroundBlockProps>["Controls"] = [
		{
			panel: "Background",
			controls: [
				{
					type: "select",
					label: "Background color",
					path: "backgroundColor",
					options: colorOptions,
					defaultValue: defaultBackgroundColor,
				},
				{
					type: "toggle",
					label: "Gradient",
					path: "gradient",
					show: ({ backgroundColor }) =>
						withGradient && (!!defaultBackgroundColor || !!backgroundColor),
				},

				{
					type: "responsive-image",
					label: "Background image",
					path: "backgroundImage",
				},
				{
					type: "toggle",
					label: "Parallax",
					path: "parallax",
					show: ({ backgroundImage }) => withParallax && hasBackgroundImage(backgroundImage),
				},
			],
			initialOpen: true,
		},
		{
			panel: "Advanced",
			controls: [
				{
					type: "text",
					label: "Background Image Classes",
					path: "backgroundImageClassName",
					show: ({ backgroundImage }) => hasBackgroundImage(backgroundImage),
				},
				{
					type: "text",
					label: "Background Classes",
					path: "backgroundClassName",
				},
				{ type: "text", label: "Container Classes", path: "containerClassName" },
			],
		},
	]

	return { backgroundAttributes, backgroundControls }
}

export default background
