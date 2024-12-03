import type {BP as _BP} from "@bring/blocks-client/types";

/**
 * Extend the global entity props type.
 *
 * Entities are created in WordPress such as posts, pages, categories, tags etc.
 * Custom values can be added in WordPress to entities for example Post reading time, Product price etc.
 * Entities can be queried by their slug with getEntity function.
 * Extend the getEntity function return type with the types of the custom values added in WordPress.
 */
export type EntityProps = {
	// sample: string | null;
};

/**
 * Extend site props type.
 *
 * SiteProps are properties related to the site.
 * Custom values can be added in WordPress to SiteProps for example Social links, Opening hours etc.
 * Extend the getSiteProps function return type with the types of the custom values added in WordPress.
 */
export type SiteProps = {
	// sample: string | null;
};

/**
 * List of menus is a default Site prop.
 * Menus can be extended in WordPress with custom values.
 * Extend the Menu type with the types of the custom values added in WordPress.
 */
export type Menu = {
	// sample: string;
};

/**
 * Menus in SiteProps have an array of MenuItems.
 * Menu items can be extended in WordPress with custom values.
 * Extend the MenuItem type with the types of the custom values added in WordPress.
 */
export type MenuItem = {
	// sample: string;
};

/**
 * Variables can be sent to the block with the Context type.
 */
export type Context = {
	// sample: string;
};

/**
 * Initialize BlockProps type by extending with EntityProps, SiteProps, Menu, MenuItem, Context types.
 */
export type BP<Props> = _BP<Props, EntityProps, SiteProps, Menu, MenuItem, Context>;
