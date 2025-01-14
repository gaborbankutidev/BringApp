import type { FC, ReactNode } from "react"
import { BlockStyles, BlockStylesClassNames, BlockStylesConfig } from "./styles"

/**
 * Represents a type that excludes the `undefined` type from the given type `T`.
 */
export type Defined<T> = Exclude<T, undefined>

/**
 * Attributes of Block Props
 *
 * className: the joined and rendered block styles class names with the className string set in the ClassName control
 */
export type ClientAttributes<T> = T & { className?: string; id?: string }

/**
 * Attributes of BlockNode coming from the editor.
 *
 * className: String set in the ClassName control.
 * blockStyles: Block styles object set in the block styles controls
 */
export type EditorAttributes<T> = T & { className?: string; id?: string; blockStyles: BlockStyles }

/**
 * Block Props - The generic types of a block.
 * @template P - Props type
 * @template EP - Entity Props type
 * @template SP - Site Props type
 * @template M - Menu type
 * @template MI - Menu Item type
 * @template CTX - Context type
 */
export type BP<P = object, EP = object, SP = object, M = object, MI = object, CTX = object> = {
	attributes: ClientAttributes<P>
	entityProps?: EntityProps<EP>
	siteProps?: SiteProps<SP, M, MI>
	context?: CTX
	blockStyles?: BlockStyles
	blockStylesConfig?: BlockStylesConfig
	blockStylesClassNames?: BlockStylesClassNames
	children?: ReactNode
}

/**
 * Functional component that accepts Block Props.
 * @template P - Props type
 * @template EP - Entity Props type
 * @template SP - Site Props type
 * @template M - Menu type
 * @template MI - Menu Item type
 * @template CTX - Context type
 */
export type FCB<P = object, EP = object, SP = object, M = object, MI = object, CTX = object> = FC<
	BP<P, EP, SP, M, MI, CTX>
>

/**
 * Represents a numeric type that can have values from 1 to 12.
 */
export type GridNumType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * Represents a media type with optional properties.
 * @property id - The media ID.
 * @property title - The media title.
 * @property filename - The media filename.
 * @property src - The media source URL.
 * @property alt - The media alt text.
 * @property description - The media description.
 * @property caption - The media caption.
 * @property mime - The media MIME type.
 * @property type - The media type.
 */
export type MediaType = {
	id: number | null
	title?: string
	filename?: string
	src?: string
	alt?: string
	description?: string
	caption?: string
	mime?: string
	type?: string
}

/**
 * Represents an image type, which is a subtype of MediaType.
 */
export type ImageType = MediaType

/**
 * Represents a menu item with optional children.
 * @template T - Additional properties type
 * @property id - The menu item ID.
 * @property name - The menu item name.
 * @property url - The menu item URL.
 * @property description - The menu item description.
 * @property target - The menu item target.
 * @property classes - The menu item classes.
 * @property children - The menu item children.
 */
export type MenuItemType<T = object> = {
	id?: number
	name: string
	url: string
	description?: string
	target?: string
	classes?: string
	children?: MenuItemType<T>[]
} & T

/**
 * Represents a menu with optional additional properties and menu items.
 * @template T - Additional properties type
 * @template iT - Menu Item type
 * @property id - The menu ID.
 * @property name - The menu name.
 * @property items - The menu items.
 */
export type MenuType<T = object, iT = object> = {
	id: number
	name: string
	items: MenuItemType<iT>[]
} & T

/**
 * Represents a menu location with a key and associated menu ID.
 * @property key - The menu location key.
 * @property menuId - The associated menu ID.
 */
export type MenuLocationType = {
	key: string
	menuId: number
}

/**
 * Represents the type of an entity, which can be "post", "taxonomy", or "author".
 */
export type EntityType = "post" | "taxonomy" | "author"

/**
 * Represents a dynamic entity list, which is an array of objects with entity properties and additional properties.
 * @template T - Additional properties type
 */
export type DynamicEntityList<T = object> = ({
	entityType: EntityType | null
	entitySlug: string | null
	entityId: number
	name: string
	image: ImageType | null
	excerpt: string | null
	description: string | null
	slug: string | null
	url: string | null
	editUrl: string | null
} & T)[]

/**
 * Represents dynamic entity properties, which can have different shapes depending on the entity type.
 * @template T - Additional properties type
 * @property entityType - The entity type.
 * @property entitySlug - The entity slug.
 * @property entityId - The entity ID.
 * @property name - The entity name.
 * @property image - The entity image.
 * @property excerpt - The entity excerpt.
 * @property description - The entity description.
 * @property slug - The entity slug.
 * @property url - The entity URL.
 */
export type DynamicEntityProps<T = object> = {
	entityType: EntityType | null
	entitySlug: string | null
	entityId: number
	name: string
	image: ImageType | null
	excerpt: string | null
	description: string | null
	slug: string | null
	url: string | null
	editUrl: string | null
} & T

/**
 * Represents site properties, which include menus and menu locations.
 * @template SP - Site Props type
 * @template M - Menu type
 * @template MI - Menu Item type
 * @property menus - The site menus.
 * @property menuLocations - The site menu locations.
 */
export type SiteProps<SP = object, M = object, MI = object> = {
	menus: MenuType<M, MI>[]
	menuLocations: MenuLocationType[]
} & SP

/**
 * Represents the content of an entity, which includes header, main, footer, and layout sections.
 * @property header - The header content.
 * @property main - The main content.
 * @property footer - The footer content.
 * @property layout - The layout content.
 */
export type EntityContent = {
	header: BringNode[] | null
	main: BringNode[] | null
	footer: BringNode[] | null
	layout: BringNode[] | null
}

/**
 * Represents entity properties, which include entity type, slug, ID, URL, name, excerpt, description, and image.
 * @template EP - Entity Props type
 * @property entityType - The entity type.
 * @property entitySlug - The entity slug.
 * @property entityId - The entity ID.
 * @property url - The entity URL.
 * @property slug - The entity slug.
 * @property name - The entity name.
 * @property excerpt - The entity excerpt.
 * @property description - The entity description.
 * @property image - The entity image.
 */
export type EntityProps<EP = object> = {
	entityType: EntityType | null
	entitySlug: string | null
	entityId: number
	slug: string | null
	url: string | null
	editUrl: string | null

	name: string | null
	excerpt: string | null
	description: string | null
	image?: ImageType | null
} & EP

/**
 * Represents an entity, which has an ID, slug, type, props, and content.
 * @template EP - Entity Props type
 * @property id - The entity ID.
 * @property slug - The entity slug.
 * @property type - The entity type.
 * @property props - The entity props.
 * @property content - The entity content.
 */
export type Entity<EP = object> = {
	id: number | null
	slug: string | null
	type: EntityType | null

	props: EntityProps<EP>
	content: EntityContent
}

/**
 * Represents a node in the BringBlocks component tree, which has a key, component name, props, and optional children.
 * @property key - The node key.
 * @property component - The node component name.
 * @property attributes - The node attributes.
 * @property children - The node children.
 */
export type BringNode = {
	key: string
	blockName: string
	attributes: EditorAttributes<unknown>
	children?: BringNode[]
}

/**
 * Represents the name of a block.
 * - Must consist only of lowercase characters.
 * - Formatted as `category/name`, with the category and name separated by a slash.
 * Example: `bring/heading`.
 */
export type BlockName = `${Lowercase<string>}/${Lowercase<string>}`

/**
 * A Block List Item is a configuration object for a block.
 * Used to create blocks in the editor and render the content on the client.
 */
export type BlockListItem<
	EP = object, // EntityProps
	SP = object, // SiteProps
	M = object, // Menu
	MI = object, // MenuItem
	CTX = object, // Context
> = {
	blockName: BlockName
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Block: FCB<any, EP, SP, M, MI, CTX>
	blockStylesConfig?: BlockStylesConfig
}

/**
 * An array of Block List Items.
 * Used to initialize client render functions and set up the editor.
 */
export type BlockList<
	EP = object, // EntityProps
	SP = object, // SiteProps
	M = object, // Menu
	MI = object, // MenuItem
	CTX = object, // Context
> = BlockListItem<EP, SP, M, MI, CTX>[]

export type Obj = Record<string, unknown>
