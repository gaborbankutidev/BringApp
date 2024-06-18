import type {FC} from "react";
import {BringStylesClassNames} from "./styles";

/**
 * Represents a generic object with string keys and unknown values.
 */
export type Obj = Record<string, unknown>;

/**
 * Represents a type that excludes the `undefined` type from the given type `T`.
 */
export type Defined<T> = Exclude<T, undefined>;

/**
 * Represents a generic type that combines properties from multiple types.
 * @template P - Props type
 * @template EP - Entity Props type
 * @template SP - Site Props type
 * @template M - Menu type
 * @template MI - Menu Item type
 * @template CTX - Context type
 */
export type BP<P = {}, EP = {}, SP = {}, M = {}, MI = {}, CTX = {}> = P & {
	bringStylesClassNames?: BringStylesClassNames | undefined;
	className?: string | undefined;
	id?: string | undefined;

	entityProps?: EntityProps<EP>;
	siteProps?: SiteProps<SP, M, MI>;
	context?: CTX;
};

/**
 * Represents a functional component that accepts generic props.
 * @template P - Props type
 * @template EP - Entity Props type
 * @template SP - Site Props type
 * @template M - Menu type
 * @template MI - Menu Item type
 * @template CTX - Context type
 */
export type FCC<P = {}, EP = {}, SP = {}, M = {}, MI = {}, CTX = {}> = FC<
	BP<P, EP, SP, M, MI, CTX>
>;

/**
 * Represents a numeric type that can have values from 1 to 12.
 */
export type GridNumType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Represents a media type with optional properties.
 */
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

/**
 * Represents an image type, which is a subtype of MediaType.
 */
export type ImageType = MediaType;

/**
 * Represents a menu item with optional children.
 * @template T - Additional properties type
 */
export type MenuItemType<T = {}> = {
	id?: number;
	name: string;
	url: string;
	description?: string;
	target?: string;
	classes?: string;
	children?: MenuItemType<T>[];
} & T;

/**
 * Represents a menu with optional additional properties and menu items.
 * @template T - Additional properties type
 * @template iT - Menu Item type
 */
export type MenuType<T = {}, iT = {}> = {
	id: number;
	name: string;
	items: MenuItemType<iT>[];
} & T;

/**
 * Represents a menu location with a key and associated menu ID.
 */
export type MenuLocationType = {
	key: string;
	menuId: number;
};

/**
 * Represents the type of an entity, which can be "post", "taxonomy", or "author".
 */
export type EntityType = "post" | "taxonomy" | "author";

/**
 * Represents a dynamic entity list, which is an array of objects with entity properties and additional properties.
 * @template T - Additional properties type
 */
export type DynamicEntityList<T = {}> = ({
	entityType: EntityType | null;
	entitySlug: string | null;
	entityId: number;
	name: string;
	image: ImageType | null;
	excerpt: string | null;
	description: string | null;
	slug: string | null;
	url: string | null;
} & T)[];

/**
 * Represents dynamic entity properties, which can have different shapes depending on the entity type.
 * @template T - Additional properties type
 */
export type DynamicEntityProps<T = {}> = {
	entityType: EntityType | null;
	entitySlug: string | null;
	entityId: number;
	name: string;
	image: ImageType | null;
	excerpt: string | null;
	description: string | null;
	slug: string | null;
	url: string | null;
} & T;

/**
 * Represents site properties, which include menus and menu locations.
 * @template SP - Site Props type
 * @template M - Menu type
 * @template MI - Menu Item type
 */
export type SiteProps<SP = {}, M = {}, MI = {}> = {
	menus: MenuType<M, MI>[];
	menuLocations: MenuLocationType[];
} & SP;

/**
 * Represents the content of an entity, which includes header, main, footer, and layout sections.
 */
export type EntityContent = {
	header: BringNode[] | null;
	main: BringNode[] | null;
	footer: BringNode[] | null;
	layout: BringNode[] | null;
};

/**
 * Represents entity properties, which include entity type, slug, ID, URL, name, excerpt, description, and image.
 * @template EP - Entity Props type
 */
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

/**
 * Represents an entity, which has an ID, slug, type, props, and content.
 * @template EP - Entity Props type
 */
export type Entity<EP = {}> = {
	id: number | null;
	slug: string | null;
	type: EntityType | null;

	props: EntityProps<EP>;
	content: EntityContent;
};

/**
 * Represents a node in the BringBlocks component tree, which has a key, component name, props, and optional children.
 */
export type BringNode = {
	key: string;
	component: string;
	props: Obj;
	children?: BringNode[];
};
