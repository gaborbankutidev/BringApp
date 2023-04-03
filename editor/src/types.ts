import type {FC} from "react";
import type {BringStyles} from "./styles/types";

export type Obj = Record<string, unknown>;
export type Defined<T> = Exclude<T, undefined>;

export type FCC<P = {}> = FC<
	P & {className?: string; bringStyles?: BringStyles}
>;
export type GridNumType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type ImageType = {
	src?: string;
	alt?: string;
	id: number | null;
};

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
export type DynamicEntityList<T = {}> = ({id: number} & T)[] | null;
export type DynamicEntityProps<T extends {[key: string]: any} = {}> =
	| ({
			name: string;
			image: ImageType | null;
			excerpt: string | null;
			description: string | null;
			slug: string | null;
			url: string;
	  } & T)
	| null;

// todo refactor ->
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
// refactor end

export type SiteProps<SP> = {
	logo: string | null;
	url: string;
	menus: MenuType[];
} & SP;

export type EntityContent = {
	header?: BringNode[];
	main: BringNode[];
	footer?: BringNode[];
	layout?: BringNode[];
};

export type EntityProps<EP extends {[key: string]: any} = {}> = {
	entityType: EntityType | null;
	entitySlug: string | null;
	entityId: number;
	name: string | null;
	excerpt: string | null;
	description: string | null;
	image?: ImageType | null;
	url: string | null;
} & EP;

export type BringContextType<
	SP extends {[key: string]: any} = {},
	EP extends {[key: string]: any} = {},
> = {
	siteProps: SiteProps<SP>;
	entityContent: EntityContent;
	entityProps: EntityProps<EP>;
	dynamicCache: Map<string, any>;
	contentCache: Map<
		string,
		{
			url: string;
			content?: {
				entityContent: {main: BringNode[]; layout?: BringNode[]};
				entityProps: EntityProps<EP>;
			};
			isLoading?: boolean;
		}
	>;
};

// ===========

export type BringNode = {
	key: string;
	component: string;
	props: {[key: string]: any};
	children?: BringNode[];
};

export type NestedKeyOf<ObjectType extends object> = {
	[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
		?
				| `${Key}`
				| `${Key}.${NestedKeyOf<ObjectType[Key]> extends infer U extends string
						? U
						: never}`
		: `${Key}`;
}[keyof ObjectType & (string | number)];

type DeepRequired<T extends Obj> = {
	[P in keyof T]-?: T[P] extends Obj ? DeepRequired<T[P]> : T[P];
};

type NestedTypedKeyOfOnRequired<ObjectType extends Obj, T> = {
	[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends T
		? `${Key}`
		: ObjectType[Key] extends Obj
		? `${Key}.${NestedTypedKeyOfOnRequired<
				ObjectType[Key],
				T
		  > extends infer U extends string
				? U
				: never}`
		: never;
}[keyof ObjectType & (string | number)];

export type NestedTypedKeyOf<
	ObjectType extends Obj,
	T,
> = NestedTypedKeyOfOnRequired<DeepRequired<ObjectType>, T>;
