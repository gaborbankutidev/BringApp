import type {FC} from "react";
import type {BlockControl} from "../blocks";
import type {ImageType, NestedTypedKeyOf, Obj} from "../types";

type _ControlType = {
	label: string;
	setDefault?: boolean;
	//default?: vT;
	show?: boolean;
};

export type ControlByPath<pT extends Obj, vT> = _ControlType & {
	updateHandling?: "by-path";
	path: NestedTypedKeyOf<pT, vT>;
};

export type ControlByValue<vT> = _ControlType & {
	updateHandling: "by-value";
	value: vT | undefined;
	setValue: (newValue: vT | any) => void;
};

export type ControlType<vT, pT extends Obj = {}> =
	| ControlByPath<pT, vT>
	| ControlByValue<vT>;

// ===========

type _ArrayControlType<vT> = {
	label?: string;
	defaultItem?: vT;
	show?: boolean;
	control?: FC<ControlType<vT>>;
};

export type ArrayControlByPath<pT extends Obj, vT> = _ArrayControlType<vT> & {
	updateHandling: "by-path";
	path: NestedTypedKeyOf<pT, vT>;
};

export type ArrayControlByValue<vT> = _ArrayControlType<vT> & {
	updateHandling: "by-value";
	value: Array<vT>;
	setValue: (newValue: Array<vT>) => void;
};

export type ArrayControlType<vT, pT extends Obj = {}> =
	| ArrayControlByPath<pT, vT>
	| ArrayControlByValue<vT>;

// ===========

type _ControlConfigType<Props extends Obj = {}> = {
	label: string;
	setDefault?: boolean;
	show?: string | ((attributes: Props) => boolean);
};

type CheckboxControlConfigType<Props extends Obj = {}> = {
	type: "checkbox";
	path: NestedTypedKeyOf<Props, boolean>;
} & _ControlConfigType<Props>;

type ToggleControlConfigType<Props extends Obj = {}> = {
	type: "toggle";
	path: NestedTypedKeyOf<Props, boolean>;
} & _ControlConfigType<Props>;

type RangeControlConfigType<Props extends Obj = {}> = {
	type: "range";
	path: NestedTypedKeyOf<Props, number>;
	min?: number;
	max?: number;
} & _ControlConfigType<Props>;

type TextControlConfigType<Props extends Obj = {}> = {
	type: "text";
	path: NestedTypedKeyOf<Props, string>;
} & _ControlConfigType<Props>;

type TextareaControlConfigType<Props extends Obj = {}> = {
	type: "textarea";
	path: NestedTypedKeyOf<Props, string>;
	rows?: number;
} & _ControlConfigType<Props>;

type SelectControlConfigType<Props extends Obj = {}> = {
	type: "select";
	path: NestedTypedKeyOf<Props, string>;
	options: {
		label: string;
		value: string;
	}[];
} & _ControlConfigType<Props>;

type ComboboxControlConfigType<Props extends Obj = {}> = {
	type: "combobox";
	path: NestedTypedKeyOf<Props, string>;
	options: {
		label: string;
		value: string;
	}[];
} & _ControlConfigType<Props>;

type ImageControlConfigType<Props extends Obj = {}> = {
	type: "image";
	path: NestedTypedKeyOf<Props, ImageType>;
} & _ControlConfigType<Props>;

type TextArrayControlConfigType<Props extends Obj = {}> = {
	type: "text-array";
	path: NestedTypedKeyOf<Props, string[]>;
} & _ControlConfigType<Props>;

type ImageArrayControlConfigType<Props extends Obj = {}> = {
	type: "image-array";
	path: NestedTypedKeyOf<Props, ImageType[]>;
} & _ControlConfigType<Props>;

export type ControlConfigType<Props extends Obj = {}> =
	| CheckboxControlConfigType<Props>
	| ToggleControlConfigType<Props>
	| RangeControlConfigType<Props>
	| TextControlConfigType<Props>
	| TextareaControlConfigType<Props>
	| SelectControlConfigType<Props>
	| ComboboxControlConfigType<Props>
	| ImageControlConfigType<Props>
	| TextArrayControlConfigType<Props>
	| ImageArrayControlConfigType<Props>;

export type ControlsConfigType<Props extends Obj = {}> =
	| (
			| {
					panel: string;
					controls: (ControlConfigType<Props> | FC<BlockControl<Props>>)[];
			  }
			| FC<BlockControl<Props>>
	  )[]
	| FC<BlockControl<Props>>;
