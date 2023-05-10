import type {FC, ReactNode} from "react";
import type {BlockIcon} from "@wordpress/blocks";
import type {FCC} from "@bring/blocks-client";
import type {NestedKeyOf, Obj} from "../types";
import type {ControlConfigType} from "../controls/types";
import {BringStyles, BringStylesConfig} from "../styles/types";

export type ClientAttributes<Props> = Omit<Props, "children">;

export type EditorAttributes = {
	key: string;
	parentKey: string;
	className?: string;
	id?: string;
	bringStyles?: BringStyles;
};

export type Attributes<Props> = ClientAttributes<Props> & EditorAttributes;

// ===========

type AttributeSource<V> = {type: string; default: V | undefined};
type BlockAttributesConfig<Props> = {
	[k in keyof ClientAttributes<Props>]: AttributeSource<
		ClientAttributes<Props>[k]
	>;
};

export type BlockControlsConfig<Props extends Obj = {}> =
	| (
			| {
					panel?: "Advanced" | string;
					controls: (
						| ControlConfigType<Attributes<Props>>
						| BlockControl<Props>
					)[];
					initialOpen?: boolean;
					show?:
						| NestedKeyOf<Attributes<Props>>
						| ((attributes: Attributes<Props>) => boolean);
			  }
			| BlockControl<Props>
	  )[]
	| BlockControl<Props>;

// ===========

export type BlockControl<Props> = FC<{
	attributes: Attributes<Props>;
	setAttributes: (attributes: Partial<Attributes<Props>>) => void;
}>;

export type BlockEdit<Props> = FC<{
	attributes: Attributes<Props>;
	setAttributes: (attributes: Partial<Attributes<Props>>) => void;
	isSelected?: boolean;
	clientId: string;
	children?: ReactNode;
}>;

export type BlockSave<Props> = FC<{
	attributes: Attributes<Props>;
}>;

// ===========

export type BlockConfig<Props extends Obj = {}> = {
	title?: string;
	description?: string;
	icon?: BlockIcon;
	componentName: string;
	Component: FCC<Props>;
	attributes?: BlockAttributesConfig<Props>;
	previewAttributes?: ClientAttributes<Props>;
	allowedBlocks?: string[];
	Controls?: BlockControlsConfig<Props>;
	Edit?: BlockEdit<Props>;
	styles?: BringStylesConfig;
};
