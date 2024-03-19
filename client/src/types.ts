import type {FC} from "react";
import {BringStylesClassNames} from "./styles";

export type Obj = Record<string, unknown>;
export type Defined<T> = Exclude<T, undefined>;

export type BP<P = {}, EP = {}, SP = {}, M = {}, MI = {}, CTX = {}> = P & {
	bringStylesClassNames?: BringStylesClassNames | undefined;
	className?: string | undefined;
	id?: string | undefined;

	entityProps?: EntityProps<EP>;
	siteProps?: SiteProps<SP, M, MI>;
	context?: CTX;
};

export type FCC<P = {}, EP = {}, SP = {}, M = {}, MI = {}, CTX = {}> = FC<
	BP<P, EP, SP, M, MI, CTX>
>;

export type GridNumType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type ImageType = {
	src?: string;
	alt?: string;
	id: number | null;
};

export type MenuItemType<T = {}> = {
	name: string;
	url?: string;
	target: string;
	classes: string;
	children?: MenuItemType<T>[];
} & T;

export type MenuType<T = {}, iT = {}> = {
	id: number;
	name: string;
	items: MenuItemType<iT>[];
} & T;

// ===========

export type EntityType = "post" | "taxonomy" | "author";

export type DynamicEntityList<T = {}> = ({id: number} & T)[] | null;
export type DynamicEntityProps<T = {}> =
	| ({
			name: string;
			image: ImageType | null;
			excerpt: string | null;
			description: string | null;
			slug: string | null;
			url: string;
	  } & T)
	| null;

export type SiteProps<SP = {}, M = {}, MI = {}> = {
	menus: MenuType<M, MI>[];
} & SP;

export type EntityContent = {
	header: BringNode[] | null;
	main: BringNode[] | null;
	footer: BringNode[] | null;
	layout: BringNode[] | null;
};

export type EntityProps<EP = {}> = {
	entityType: EntityType | null;
	entitySlug: string | null;
	entityId: number;
	url: string | null;
	slug: string | null;

	name: string | null;
	excerpt: string | null;
	description: string | null;
	image?: ImageType | null;
} & EP;

export type Entity<EP = {}> = {
	id: number | null;
	slug: string | null;
	type: EntityType | null;

	props: EntityProps<EP>;
	content: EntityContent;
	head: string | null;
	responseCode?: 200;
};

// ===========

export type BringNode = {
	key: string;
	component: string;
	props: Obj;
	children?: BringNode[];
};
