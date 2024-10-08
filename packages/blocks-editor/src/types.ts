import type {FC} from "react";
import type {BringStyles} from "./styles/types";

export type Obj = Record<string, unknown>;
export type Defined<T> = Exclude<T, undefined>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type FCB<Props = {}> = FC<
	Props & {className?: string; id?: string; bringStyles?: BringStyles}
>;

export type GridNumType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type MediaType = {
	id: number | null;
	title?: string;
	filename?: string;
	src?: string;
	alt?: string;
	description?: string;
	caption?: string;
	mime?: string;
	type?: string;
};

export type ImageType = MediaType;

export type LinkType = {
	url?: string;
	newTab?: boolean;
};

export type MenuItemType = {
	url?: string;
	name: string;
	target: string;
	children?: MenuItemType[];
};

export type MenuType = {
	id: number;
	name: string;
	items: MenuItemType[];
};

// ===========

export type EntityType = "post" | "taxonomy" | "author";

export type DynamicEntityOptions = [number, string][] | null;

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

export type BringNode = {
	key: string;
	component: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	props: {[key: string]: any};
	children?: BringNode[];
};

export type WpBlock = {
	clientId: string;
	name: string;
	attributes: Record<string, unknown>;
	innerBlocks: WpBlock[];
};

// ===========

export type NestedKeyOf<ObjectType extends object> = {
	[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
		?
				| `${Key}`
				| `${Key}.${NestedKeyOf<ObjectType[Key]> extends infer U extends string ? U : never}`
		: `${Key}`;
}[keyof ObjectType & (string | number)];

type DeepRequired<T extends Obj> = {
	[P in keyof T]-?: T[P] extends Obj ? DeepRequired<T[P]> : T[P];
};

type NestedTypedKeyOfOnRequired<ObjectType extends Obj, T> = {
	[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends T
		? `${Key}`
		: ObjectType[Key] extends Obj
			? `${Key}.${NestedTypedKeyOfOnRequired<ObjectType[Key], T> extends infer U extends
					string
					? U
					: never}`
			: never;
}[keyof ObjectType & (string | number)];

export type NestedTypedKeyOf<ObjectType extends Obj, T> = NestedTypedKeyOfOnRequired<
	DeepRequired<ObjectType>,
	T
>;

type ValidComponentNamePart = `${Lowercase<string> | "-"}${Lowercase<string> | "-" | ""}`;
type ValidComponentNameWithSlash = `${ValidComponentNamePart}/${ValidComponentNamePart}`;
export type ValidComponentName =
	`${Lowercase<string>}${ValidComponentNameWithSlash}${Lowercase<string>}`;
