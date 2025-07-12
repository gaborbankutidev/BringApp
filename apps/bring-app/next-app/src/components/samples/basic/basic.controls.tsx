import { colorOptions } from "@/editor/utils/options"
import { type ColorType } from "@/styles/colors"
import { type BlockControl } from "@bring/blocks-editor/blocks"
import {
	CheckboxControl,
	RangeControl,
	ResponsiveRangeControl,
	SelectControl,
	TextareaControl,
	TextControl,
	ToggleControl,
} from "@bring/blocks-editor/controls"
import { BasicBlockProps } from "./basic.block"

export const BasicControls: BlockControl<BasicBlockProps> = ({ attributes, setAttributes }) => (
	<>
		<ToggleControl
			updateHandling="by-value"
			value={attributes.bool}
			setValue={(value) => setAttributes({ bool: value })}
			label="Bool - toggle"
			setDefault={false}
		/>

		<CheckboxControl
			updateHandling="by-value"
			value={attributes.bool}
			setValue={(value) => setAttributes({ bool: value })}
			label="Bool - checkbox"
			setDefault={false}
		/>

		<TextControl
			updateHandling="by-value"
			value={attributes.string}
			setValue={(value) => setAttributes({ string: value })}
			label="String - text"
			setDefault={false}
		/>

		<TextareaControl
			updateHandling="by-value"
			value={attributes.string}
			setValue={(value) => setAttributes({ string: value })}
			label="String - textarea"
			setDefault={false}
		/>

		<RangeControl
			updateHandling="by-value"
			value={attributes.number}
			setValue={(value) => setAttributes({ number: value })}
			label="Number"
			min={0}
			max={100}
			step={(value) => (value < 5 ? 1 : 2)}
		/>

		<SelectControl
			updateHandling="by-value"
			value={attributes.backgroundColor}
			setValue={(value) => setAttributes({ backgroundColor: value as ColorType })}
			label="Background color"
			options={colorOptions}
			defaultValue="transparent"
		/>

		<ResponsiveRangeControl
			updateHandling="by-value"
			value={attributes.containerGap}
			setValue={(value) => setAttributes({ containerGap: value })}
			label="Container gap"
			min={0}
			max={64}
			step={(value) => (value < 12 ? 1 : value < 16 ? 2 : 4)}
			defaultValue={{ "": 3 }}
		/>
	</>
)
