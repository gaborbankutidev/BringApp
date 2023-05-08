import type {FC, ReactNode} from "react";
import type {BlockIcon} from "@wordpress/blocks";
import type {FCC, Obj} from "../types";
import type {ControlsConfigType} from "../controls/types";
import {BringStylesConfig} from "../styles/types";

type AttributeSource<V> = {type: string; default: V | undefined};

type BlockAttributes<Props> = {
	[k in keyof Omit<Props, "children">]: AttributeSource<
		Omit<Props, "children">[k]
	>;
};

export type BlockKeys = {key: string; parentKey: string};

export type BlockEdit<Props> = {
	attributes: Props & BlockKeys;
	setAttributes: (attributes: Partial<Props & BlockKeys>) => void;
	isSelected?: boolean;
	clientId: string;
	children?: ReactNode;
};

export type BlockSave<Props> = {
	attributes: Props & BlockKeys;
};

export type BlockControl<Props> = {
	attributes: Props & BlockKeys;
	setAttributes: (attributes: Partial<Props & BlockKeys>) => void;
};

export type BlockConfig<Props extends Obj = {}> = {
	title?: string;
	description?: string;
	icon?: BlockIcon;
	Component: FCC<Props>;
	componentName: string;
	attributes?: BlockAttributes<Props>;
	previewAttributes?: BlockAttributes<Props>;
	allowedBlocks?: string[];
	Controls?: ControlsConfigType<Props>;
	Edit?: FC<BlockEdit<Props>>;
	bringStyles?: BringStylesConfig;
};
