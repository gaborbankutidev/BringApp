import {FC, ReactNode} from "react";
import type {BlockStyles, BlockStylesClassNames, BlockStylesConfig} from "./styles";
import type {ImageType} from "./types";

export type MenuItemType<T = object> = {
	name: string;
	url?: string;
	target: string;
	classes: string;
	children?: MenuItemType<T>[];
} & T;

export type MenuType<T = object, iT = object> = {
	id: number;
	name: string;
	items: MenuItemType<iT>[];
} & T;

export type SiteProps<SP = object, M = object, MI = object> = {
	menus: MenuType<M, MI>[];
} & SP;

export type EntityType = "post" | "taxonomy" | "author";

export type EntityProps<EP = object> = {
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

export type BP<P = object, EP = object, SP = object, M = object, MI = object, CTX = object> = P & {
	attributes: P & {className?: string; id?: string};
	entityProps?: EntityProps<EP>;
	siteProps?: SiteProps<SP, M, MI>;
	context?: CTX;
	blockStyles: BlockStyles;
	blockStylesConfig?: BlockStylesConfig;
	blockStylesClassNames: BlockStylesClassNames;
	children?: ReactNode;
};

export type FCB<P = object, EP = object, SP = object, M = object, MI = object, CTX = object> = FC<
	BP<P, EP, SP, M, MI, CTX>
>;

export type ResponsiveValue<T = number> = {
	""?: T;
	md?: T;
	lg?: T;
};
