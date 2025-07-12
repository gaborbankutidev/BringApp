import { type TagType } from "@/types/entity"
import type { BP as _BP } from "@bring/blocks-client/types"

/**
 * Extend the global EntityProps type to include custom properties for WordPress entities.
 *
 * Entities in WordPress—such as posts, pages, categories, and tags—can have custom fields (e.g., post reading time, product price).
 * The `getEntity` function retrieves entities by slug, but the entity type is not always known in advance.
 *
 * `EntityProps` serves as a comprehensive type encompassing all possible properties that any entity might have.
 * Each property should be nullable to accommodate differences between entity types (e.g., a post may have a reading time, but a page may not).
 *
 * Think of `EntityProps` as a superset of all fields available to any WordPress entity.
 *
 * Default properties included:
 * - entityType: string | null
 * - entitySlug: string | null
 * - entityId: number
 * - slug: string | null
 * - url: string | null
 * - editUrl: string | null
 * - name: string | null
 * - excerpt: string | null
 * - description: string | null
 * - image: ImageType | null
 *
 * You can extend this type to add custom properties for any entity type.
 *
 * Tip: We recommend extending each post type with the default tag property to support site-wide search.
 */
export type EntityProps = {
	tags: TagType[] | null
}

/**
 * Extend the SiteProps type to include custom site-wide properties.
 *
 * SiteProps represent global properties related to the site itself.
 * You can add custom fields in WordPress—such as social links, opening hours, or any other site-wide settings—
 * and extend the return type of the getSiteProps function accordingly.
 *
 * Default SiteProps include:
 * - menus: MenuType<Menu, MenuItem>[]; // Array of menus (can be extended via the Menu and MenuItem types below)
 * - menuLocations: MenuLocationType[]; // Array of menu locations
 *
 * To add custom site-wide properties, simply extend this type with your additional fields.
 * For example, we've included social links which is a common use case. These options will be available in the admin if you install the ACF Pro plugin on your WordPress site.
 */
export type SiteProps = {
	socialLinks: {
		facebook?: string
		instagram?: string
		linkedin?: string
		github?: string
	}
}

/**
 * List of menus is a default Site prop.
 * Menus can be extended in WordPress with custom values.
 * Extend the Menu type with the types of the custom values added in WordPress.
 */
export type Menu = object

/**
 * Menus in SiteProps have an array of MenuItems.
 * Menu items can be extended in WordPress with custom values.
 * Extend the MenuItem type with the types of the custom values added in WordPress.
 */
export type MenuItem = object

/**
 * Values can be added globally each the block with the Context type.
 * As blocks are always server side rendered, this the way to add context like global values
 */
export type Context = object

/**
 * Initialize BlockProps type by extending with EntityProps, SiteProps, Menu, MenuItem, Context types.
 */
export type BP<Props> = _BP<Props, EntityProps, SiteProps, Menu, MenuItem, Context>
