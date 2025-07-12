import { colorOptions } from "@/editor/utils/options"
import {
	type BlockConfig,
	booleanAttributeSource,
	numberAttributeSource,
	objectAttributeSource,
	stringAttributeSource,
} from "@bring/blocks-editor/blocks"
import {
	CheckboxControl,
	RangeControl,
	ResponsiveRangeControl,
	SelectControl,
	TextareaControl,
	TextControl,
	ToggleControl,
} from "@bring/blocks-editor/controls"
import { basic, type BasicBlockProps } from "./basic.block"
import { BasicControls } from "./basic.controls"

const basicConfig: BlockConfig<BasicBlockProps> = {
	...basic,
	title: "Basic Sample Block",
	description: "This is a test and sample block for basic props and features",
	icon: "art",
	attributes: {
		bool: booleanAttributeSource(false),
		string: stringAttributeSource("Lorem ipsum dolor sit amet"),
		number: numberAttributeSource(),
		button: objectAttributeSource({}),
		backgroundColor: stringAttributeSource(),
		containerGap: objectAttributeSource(),
		containerClassName: stringAttributeSource(),
	},
	/**
	 * Controls accepts a react component where you can implement your custom controls
	 * Controls: ({ attributes, setAttributes }) => <div>Implement panels with controls here</div>,
	 */
	Controls: [
		/**
		 * Controls array accepts react components where you can implement your custom controls
		 * ({ attributes, setAttributes }) => <div>Implement panels with controls here</div>,
		 */
		{
			/**
			 * Controls array accepts panel objects (recommended)
			 * Panel object has 4 properties: panel, controls, initialOpen, show
			 */
			panel: "Basic settings - Controls object", // Set panel title undefined to hide panel title so panel con not be closed.
			controls: [
				/**
				 * Panel controls array accepts react components where you can implement your custom controls
				 * ({ attributes, setAttributes }) => <div>Implement controls here</div>,
				 * More examples in the other panels below
				 */
				{
					/**
					 * Panel controls array accepts control objects (recommended)
					 * Control object has 6 properties plus the control specific properties
					 * type, label, path, defaultValue, setDefault, show
					 * See examples bellow or in other sample blocks
					 */
					type: "toggle",
					label: "Bool - toggle",
					path: "bool",
					setDefault: false, // NonNullable properties can not set to default value (undefined)
				},
				{
					type: "checkbox",
					label: "Bool - checkbox",
					path: "bool",
					setDefault: false,
				},
				{
					type: "text",
					label: "String - text",
					path: "string",
					setDefault: false,
				},
				{
					type: "textarea",
					label: "String - textarea",
					path: "string",
					setDefault: false,
				},
				{
					type: "range",
					label: "Number",
					path: "number",
					min: 0,
					max: 100,
					/**
					 * step is a number or a function that returns the step value based on the current value
					 */
					step: (value) => (value < 5 ? 1 : 2),
					/**
					 * setDefault: true by default,
					 * number is nullable so it can be set to default value (undefined)
					 * number is not displayed if it is undefined so we don't need to set a default value
					 */
				},
				{
					type: "text",
					label: "Button label",
					path: "button.label",
				},
				{
					type: "text",
					label: "Button url",
					path: "button.url",
					/**
					 * Show control based on another control value (function or path string)
					 * show: "button.label"
					 * show: (attributes) => attributes.button.label
					 */
					show: "button.label", // Show only when button label is set
				},
				{
					type: "select",
					label: "Background color",
					path: "backgroundColor",
					options: colorOptions, // makeOptions util can be used to generate option array of value and label pairs
					/**
					 * backgroundColor is nullable
					 * by setting a default value we can tell to the editor what value to show if it is undefined
					 */
					defaultValue: "transparent",
				},
				{
					type: "responsive-range",
					label: "Container gap",
					path: "containerGap",
					min: 0,
					max: 64,
					step: (value) => (value < 12 ? 1 : value < 16 ? 2 : 4),
					defaultValue: { "": 3 },
				},
			],
			initialOpen: false,
			/**
			 * Panel object accepts a show value to hide panel based on a condition (function or path string)
			 * show: (attributes) => attributes.bool,
			 * show: "bool"
			 */
		},
		{
			panel: "Basic settings - Components by path",
			controls: [
				/**
				 * All controls can be implemented using control components, either by specifying a path or by providing a value directly.
				 * When using controls by path, be sure to pass the block props type to the control component for proper type checking.
				 // Controls can be implemented here or imported from a separate file for better organization.
				 */
				() => (
					<ToggleControl<BasicBlockProps> path="bool" label="Bool - toggle" setDefault={false} />
				),
				() => (
					<CheckboxControl<BasicBlockProps>
						path="bool"
						label="Bool - checkbox"
						setDefault={false}
					/>
				),
				() => (
					<TextControl<BasicBlockProps> path="string" label="String - text" setDefault={false} />
				),
				() => (
					<TextareaControl<BasicBlockProps>
						path="string"
						label="String - textarea"
						setDefault={false}
					/>
				),
				() => (
					<RangeControl<BasicBlockProps>
						path="number"
						label="Number"
						min={0}
						max={100}
						step={(value) => (value < 5 ? 1 : 2)}
					/>
				),
				() => (
					<TextControl<BasicBlockProps>
						path="button.label"
						label="Button label"
						setDefault={false}
					/>
				),
				() => (
					<TextControl<BasicBlockProps> path="button.url" label="Button url" setDefault={false} />
				),
				() => (
					<SelectControl<BasicBlockProps>
						path="backgroundColor"
						label="Background color"
						options={colorOptions}
						defaultValue="transparent"
					/>
				),
				() => (
					<ResponsiveRangeControl<BasicBlockProps>
						path="containerGap"
						label="Container gap"
						min={0}
						max={64}
						step={(value) => (value < 12 ? 1 : value < 16 ? 2 : 4)}
						defaultValue={{ "": 3 }}
					/>
				),
			],
			initialOpen: false,
		},
		{
			panel: "Basic settings - Component by value",
			controls: [BasicControls], // Controls imported from a separate file
			initialOpen: false,
		},
		{
			/**
			 * Set panel title to Advanced to add controls to the default Advanced panel in the bottom of controls
			 * Typically classNames and ids can be added here
			 */
			panel: "Advanced",
			controls: [
				{
					type: "text",
					label: "Container class name",
					path: "containerClassName",
				},
				{
					type: "text",
					label: "Button class name",
					path: "button.className",
					show: (attributes) => !!(attributes.button.label && attributes.button.url),
				},
				{
					type: "text",
					label: "Button id",
					path: "button.id",
					show: (attributes) => !!(attributes.button.label && attributes.button.url),
				},
			],
		},
	],
}

export default basicConfig
