import type {BlockIcon} from "@wordpress/blocks";
import type {FC, ReactNode} from "react";
import {FCB} from "../client-types";
import type {ControlConfigType} from "../controls/types";
import {BlockStyles, BlockStylesConfig} from "../styles/types";
import type {NestedKeyOf, ValidBlockName} from "../types";

export type ClientAttributes<Props> = Omit<Props, "children">;

export type EditorAttributes = {
	className?: string;
	id?: string;
	blockStyles?: BlockStyles;
};

export type Attributes<Props> = ClientAttributes<Props> & EditorAttributes;

// ===========

type AttributeSource<V> = {type: string; default: V | undefined};
type BlockAttributesConfig<Props> = {
	[k in keyof ClientAttributes<Props>]: AttributeSource<ClientAttributes<Props>[k]>;
};

export type BlockControlsConfig<Props extends object = object> =
	| (
			| {
					panel?: "Advanced" | string;
					controls: (ControlConfigType<Attributes<Props>> | BlockControl<Props>)[];
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

export type BlockConfig<Props extends object = object> = {
	title?: string;
	description?: string;
	icon?: BlockIcon;
	blockName: ValidBlockName;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Block: FCB<Props, any, any, any, any, any>;
	attributes?: BlockAttributesConfig<Props>;
	previewAttributes?: ClientAttributes<Props>;
	allowedBlocks?: string[];
	Controls?: BlockControlsConfig<Props>;
	Edit?: BlockEdit<Props>;
	blockStylesConfig?: BlockStylesConfig;
};
