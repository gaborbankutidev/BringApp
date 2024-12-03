import type {FC} from "react";
import {ResponsiveValue} from "../styles/types";
import type {ImageType, MediaType, NestedKeyOf, NestedTypedKeyOf} from "../types";

export type OptionList<T extends string = string> = ([T, string] | T)[];
export type SelectControlOptions<T extends string = string> = {
	label: string;
	value: T | "";
}[];

export type NumberOptionList<T extends number = number> = ([T, string] | T)[];
export type NumberSelectControlOptions<T extends number = number> = {
	label: string;
	value: T | 0;
}[];

// ===========

type _ControlType<dVT> = {
	label: string;
	setDefault?: boolean;
	defaultValue?: dVT;
	show?: boolean;
};

export type ControlByPath<pT extends object, vT, dVT = vT> = _ControlType<dVT> & {
	updateHandling?: "by-path";
	path: NestedTypedKeyOf<pT, vT>;
};

export type ControlByValue<vT, dVT = vT> = _ControlType<dVT> & {
	updateHandling: "by-value";
	value: vT | undefined;
	setValue: (newValue: vT | undefined) => void;
};

export type ControlType<vT, pT extends object = object, dVT = vT> =
	| ControlByPath<pT, vT, dVT>
	| ControlByValue<vT, dVT>;

// ===========

type _ArrayControlType<vT> = {
	label?: string;
	defaultItem?: vT;
	show?: boolean;
	control?: FC<ControlType<vT>>;
};

export type ArrayControlByPath<pT extends object, vT> = _ArrayControlType<vT> & {
	updateHandling?: "by-path";
	path: NestedTypedKeyOf<pT, vT>;
};

export type ArrayControlByValue<vT> = _ArrayControlType<vT> & {
	updateHandling: "by-value";
	value: Array<vT>;
	setValue: (newValue: Array<vT>) => void;
};

export type ArrayControlType<vT, pT extends object = object> =
	| ArrayControlByPath<pT, vT>
	| ArrayControlByValue<vT>;

// ===========

type _ControlConfigType<Props extends object = object> = {
	label: string;
	setDefault?: boolean;
	show?: NestedKeyOf<Props> | ((attributes: Props) => boolean);
};

type CheckboxControlConfigType<Props extends object = object> = {
	type: "checkbox";
	path: NestedTypedKeyOf<Props, boolean>;
	defaultValue?: boolean;
} & _ControlConfigType<Props>;

type ResponsiveCheckboxControlConfigType<Props extends object = object> = {
	type: "responsive-checkbox";
	path: NestedTypedKeyOf<Props, ResponsiveValue<boolean>>;
	defaultValue?: ResponsiveValue<boolean>;
} & _ControlConfigType<Props>;

type ToggleControlConfigType<Props extends object = object> = {
	type: "toggle";
	path: NestedTypedKeyOf<Props, boolean>;
	defaultValue?: boolean;
} & _ControlConfigType<Props>;

type RangeControlConfigType<Props extends object = object> = {
	type: "range";
	path: NestedTypedKeyOf<Props, number>;
	min?: number;
	max?: number;
	defaultValue?: number;
} & _ControlConfigType<Props>;

type ResponsiveRangeControlConfigType<Props extends object = object> = {
	type: "responsive-range";
	path: NestedTypedKeyOf<Props, ResponsiveValue<number>>;
	min?: number;
	max?: number;
	defaultValue?: ResponsiveValue<number>;
} & _ControlConfigType<Props>;

type TextControlConfigType<Props extends object = object> = {
	type: "text";
	path: NestedTypedKeyOf<Props, string>;
	defaultValue?: string;
} & _ControlConfigType<Props>;

type TextareaControlConfigType<Props extends object = object> = {
	type: "textarea";
	path: NestedTypedKeyOf<Props, string>;
	rows?: number;
	defaultValue?: string;
} & _ControlConfigType<Props>;

type SelectControlConfigType<Props extends object = object> = {
	type: "select";
	path: NestedTypedKeyOf<Props, string>;
	options: {
		label: string;
		value: string;
	}[];
	defaultValue?: string;
} & _ControlConfigType<Props>;

type NumberSelectControlConfigType<Props extends object = object> = {
	type: "number-select";
	path: NestedTypedKeyOf<Props, number>;
	options: {
		label: string;
		value: number;
	}[];
	defaultValue?: string;
} & _ControlConfigType<Props>;

type ComboboxControlConfigType<Props extends object = object> = {
	type: "combobox";
	path: NestedTypedKeyOf<Props, string>;
	options: {
		label: string;
		value: string;
	}[];
	defaultValue?: string;
} & _ControlConfigType<Props>;

type NumberComboboxControlConfigType<Props extends object = object> = {
	type: "number-combobox";
	path: NestedTypedKeyOf<Props, number>;
	options: {
		label: string;
		value: number;
	}[];
	defaultValue?: number;
} & _ControlConfigType<Props>;

type MediaControlConfigType<Props extends object = object> = {
	type: "media";
	allowedTypes?: string[];
	path: NestedTypedKeyOf<Props, MediaType>;
} & _ControlConfigType<Props>;

type ImageControlConfigType<Props extends object = object> = {
	type: "image";
	path: NestedTypedKeyOf<Props, ImageType>;
} & _ControlConfigType<Props>;

type TextArrayControlConfigType<Props extends object = object> = {
	type: "text-array";
	path: NestedTypedKeyOf<Props, string[]>;
} & _ControlConfigType<Props>;

type ImageArrayControlConfigType<Props extends object = object> = {
	type: "image-array";
	path: NestedTypedKeyOf<Props, ImageType[]>;
} & _ControlConfigType<Props>;

export type ControlConfigType<Props extends object = object> =
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
	| MediaControlConfigType<Props>
	| ImageControlConfigType<Props>
	| TextArrayControlConfigType<Props>
	| ImageArrayControlConfigType<Props>;
