import React from "react";
import {PanelBody} from "@wordpress/components";
import {
	InspectorControls,
	InspectorAdvancedControls,
} from "@wordpress/block-editor";
import get from "lodash.get";
import type {Obj} from "../types";
import type {BlockKeys} from "./types";
import type {ControlsConfigType} from "../controls/types";
import {
	CheckboxControl,
	ToggleControl,
	ComboboxControl,
	TextControl,
	TextareaControl,
	RangeControl,
	SelectControl,
	ImageControl,
	ImageArrayControl,
	TextArrayControl,
	ResponsiveCheckboxControl,
	ResponsiveRangeControl,
	NumberComboboxControl,
	NumberSelectControl,
} from "../controls";

export function makeControls<Props extends Obj>(
	attributes: Props & BlockKeys,
	setAttributes: (attributes: Partial<Props & BlockKeys>) => void,
	Controls: ControlsConfigType<Props>,
) {
	return (
		<InspectorControls key="bring-controls">
			{typeof Controls === "function" ? (
				<Controls attributes={attributes} setAttributes={setAttributes} />
			) : (
				Controls.map((Panel) => {
					if (typeof Panel === "function") {
						return (
							<Panel attributes={attributes} setAttributes={setAttributes} />
						);
					}

					// evaluate panel show
					const showPanel =
						Panel.show === undefined
							? true
							: typeof Panel.show === "function"
							? Panel.show(attributes)
							: !!get(attributes, Panel.show);
					if (!showPanel) {
						return null;
					}

					// iterate controls
					const panelControls = Panel.controls.map((Control) => {
						if (typeof Control === "function") {
							return (
								<Control
									attributes={attributes}
									setAttributes={setAttributes}
								/>
							);
						}

						// destructure and use newly typed path property
						// casting to unknown here because typescript can't infer NestedTypedKeyOf
						const props = {
							...Control,
							show:
								Control.show === undefined
									? true
									: typeof Control.show === "function"
									? Control.show(attributes)
									: !!get(attributes, Control.show),
							updateHandling: "by-path" as const,
						} as unknown;

						switch (Control.type) {
							case "checkbox":
								return (
									<CheckboxControl
										{...(props as Parameters<typeof CheckboxControl>[0])}
									/>
								);
							case "responsive-checkbox":
								return (
									<ResponsiveCheckboxControl
										{...(props as Parameters<
											typeof ResponsiveCheckboxControl
										>[0])}
									/>
								);

							case "toggle":
								return (
									<ToggleControl
										{...(props as Parameters<typeof ToggleControl>[0])}
									/>
								);

							case "range":
								return (
									<RangeControl
										{...(props as Parameters<typeof RangeControl>[0])}
									/>
								);
							case "responsive-range":
								return (
									<ResponsiveRangeControl
										{...(props as Parameters<typeof ResponsiveRangeControl>[0])}
									/>
								);

							case "text":
								return (
									<TextControl
										{...(props as Parameters<typeof TextControl>[0])}
									/>
								);
							case "textarea":
								return (
									<TextareaControl
										{...(props as Parameters<typeof TextareaControl>[0])}
									/>
								);

							case "combobox":
								return (
									<ComboboxControl
										{...(props as Parameters<typeof ComboboxControl>[0])}
									/>
								);
							case "number-combobox":
								return (
									<NumberComboboxControl
										{...(props as Parameters<typeof NumberComboboxControl>[0])}
									/>
								);

							case "select":
								return (
									<SelectControl
										{...(props as Parameters<typeof SelectControl>[0])}
									/>
								);
							case "number-select":
								return (
									<NumberSelectControl
										{...(props as Parameters<typeof NumberSelectControl>[0])}
									/>
								);

							case "image":
								return (
									<ImageControl
										{...(props as Parameters<typeof ImageControl>[0])}
									/>
								);
							case "image-array":
								return (
									<ImageArrayControl
										{...(props as Parameters<typeof ImageArrayControl>[0])}
									/>
								);
							case "text-array":
								return (
									<TextArrayControl
										{...(props as Parameters<typeof TextArrayControl>[0])}
									/>
								);
							default:
								break;
						}

						return <div>Error while rendering control.</div>;
					});

					return Panel.panel === "Advanced" ? (
						<InspectorAdvancedControls>
							{panelControls}
						</InspectorAdvancedControls>
					) : (
						<PanelBody
							title={Panel.panel}
							initialOpen={Panel.initialOpen ?? false}
						>
							{panelControls}
						</PanelBody>
					);
				})
			)}
		</InspectorControls>
	);
}