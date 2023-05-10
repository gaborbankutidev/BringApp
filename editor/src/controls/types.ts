import type {FC} from "react";
import type {ImageType, NestedKeyOf, NestedTypedKeyOf, Obj} from "../types";
import {ResponsiveValue} from "../styles/types";

type _ControlType<dVT> = {
	label: string;
	setDefault?: boolean;
	defaultValue?: dVT;
	show?: boolean;
};

export type ControlByPath<pT extends Obj, vT, dVT = vT> = _ControlType<dVT> & {
	updateHandling?: "by-path";
	path: NestedTypedKeyOf<pT, vT>;
};

export type ControlByValue<vT, dVT = vT> = _ControlType<dVT> & {
	updateHandling: "by-value";
	value: vT | undefined;
	setValue: (newValue: vT | undefined) => void;
};

export type ControlType<vT, pT extends Obj = {}, dVT = vT> =
	| ControlByPath<pT, vT, dVT>
	| ControlByValue<vT, dVT>;

// ===========

type _ArrayControlType<vT> = {
	label?: string;
	defaultItem?: vT;
	show?: boolean;
	control?: FC<ControlType<vT>>;
};

export type ArrayControlByPath<pT extends Obj, vT> = _ArrayControlType<vT> & {
	updateHandling?: "by-path";
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
	show?: NestedKeyOf<Props> | ((attributes: Props) => boolean);
};

type CheckboxControlConfigType<Props extends Obj = {}> = {
	type: "checkbox";
	path: NestedTypedKeyOf<Props, boolean>;
	defaultValue?: boolean;
} & _ControlConfigType<Props>;

type ResponsiveCheckboxControlConfigType<Props extends Obj = {}> = {
	type: "responsive-checkbox";
	path: NestedTypedKeyOf<Props, ResponsiveValue<boolean>>;
	defaultValue?: ResponsiveValue<boolean>;
} & _ControlConfigType<Props>;

type ToggleControlConfigType<Props extends Obj = {}> = {
	type: "toggle";
	path: NestedTypedKeyOf<Props, boolean>;
	defaultValue?: boolean;
} & _ControlConfigType<Props>;

type RangeControlConfigType<Props extends Obj = {}> = {
	type: "range";
	path: NestedTypedKeyOf<Props, number>;
	min?: number;
	max?: number;
	defaultValue?: number;
} & _ControlConfigType<Props>;

type ResponsiveRangeControlConfigType<Props extends Obj = {}> = {
	type: "responsive-range";
	path: NestedTypedKeyOf<Props, ResponsiveValue<number>>;
	min?: number;
	max?: number;
	defaultValue?: ResponsiveValue<number>;
} & _ControlConfigType<Props>;

type TextControlConfigType<Props extends Obj = {}> = {
	type: "text";
	path: NestedTypedKeyOf<Props, string>;
	defaultValue?: string;
} & _ControlConfigType<Props>;

type TextareaControlConfigType<Props extends Obj = {}> = {
	type: "textarea";
	path: NestedTypedKeyOf<Props, string>;
	rows?: number;
	defaultValue?: string;
} & _ControlConfigType<Props>;

type SelectControlConfigType<Props extends Obj = {}> = {
	type: "select";
	path: NestedTypedKeyOf<Props, string>;
	options: {
		label: string;
		value: string;
	}[];
	defaultValue?: string;
} & _ControlConfigType<Props>;

type NumberSelectControlConfigType<Props extends Obj = {}> = {
	type: "number-select";
	path: NestedTypedKeyOf<Props, number>;
	options: {
		label: string;
		value: number;
	}[];
	defaultValue?: string;
} & _ControlConfigType<Props>;

type ComboboxControlConfigType<Props extends Obj = {}> = {
	type: "combobox";
	path: NestedTypedKeyOf<Props, string>;
	options: {
		label: string;
		value: string;
	}[];
	defaultValue?: string;
} & _ControlConfigType<Props>;

type NumberComboboxControlConfigType<Props extends Obj = {}> = {
	type: "number-combobox";
	path: NestedTypedKeyOf<Props, number>;
	options: {
		label: string;
		value: number;
	}[];
	defaultValue?: number;
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
	| ResponsiveCheckboxControlConfigType<Props>
	| ToggleControlConfigType<Props>
	| RangeControlConfigType<Props>
	| ResponsiveRangeControlConfigType<Props>
	| TextControlConfigType<Props>
	| TextareaControlConfigType<Props>
	| SelectControlConfigType<Props>
	| NumberSelectControlConfigType<Props>
	| ComboboxControlConfigType<Props>
	| NumberComboboxControlConfigType<Props>
	| ImageControlConfigType<Props>
	| TextArrayControlConfigType<Props>
	| ImageArrayControlConfigType<Props>;
