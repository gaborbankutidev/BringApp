import {FC} from "react";
import {BlockStyles} from "./styles/types";
import {ImageType} from "./types";

export type BringStylesClassNames = {
	spacing?: {
		m?: string;
		p?: string;
	};
	visibility?: string;
	classNames?: string;
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

export type SiteProps<SP = {}, M = {}, MI = {}> = {
	menus: MenuType<M, MI>[];
} & SP;

export type EntityType = "post" | "taxonomy" | "author";

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

export type BP<P = {}, EP = {}, SP = {}, M = {}, MI = {}, CTX = {}> = P & {
	//bringStylesClassNames?: BringStylesClassNames | undefined;

	attributes: P & {className?: string; id?: string; blockStyles?: BlockStyles};
	entityProps?: EntityProps<EP>;
	siteProps?: SiteProps<SP, M, MI>;
	context?: CTX;
};

export type FCB<P = {}, EP = {}, SP = {}, M = {}, MI = {}, CTX = {}> = FC<
	BP<P, EP, SP, M, MI, CTX>
>;

export type ResponsiveValue<T = number> = {
	""?: T;
	md?: T;
	lg?: T;
};
