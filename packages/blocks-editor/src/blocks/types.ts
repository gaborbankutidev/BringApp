import type { BlockIcon } from "@wordpress/blocks"
import { FC, ReactNode } from "react"
import { ControlConfigType } from "../controls/types"
import { BlockStylesClassNames, BlockStylesConfig, type BlockStyles } from "../styles/types"
import { ImageType, NestedKeyOf } from "../types"

type MenuItemType<T = object> = {
	id?: number
	name: string
	url: string
	description?: string
	target?: string
	classes?: string
	children?: MenuItemType<T>[]
} & T

type MenuType<T = object, iT = object> = {
	id: number
	name: string
	items: MenuItemType<iT>[]
} & T

type MenuLocationType = {
	key: string
	menuId: number
}

type SiteProps<SP = object, M = object, MI = object> = {
	menus: MenuType<M, MI>[]
	menuLocations: MenuLocationType[]
} & SP

type EntityType = "post" | "taxonomy" | "author"

type EntityProps<EP = object> = {
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

export type BP<P = object, EP = object, SP = object, M = object, MI = object, CTX = object> = P & {
	attributes: P & { className?: string; id?: string }
	entityProps?: EntityProps<EP>
	siteProps?: SiteProps<SP, M, MI>
	context?: CTX
	blockStyles: BlockStyles
	blockStylesConfig?: BlockStylesConfig
	blockStylesClassNames: BlockStylesClassNames
	children?: ReactNode
}

export type FCB<P = object, EP = object, SP = object, M = object, MI = object, CTX = object> = FC<
	BP<P, EP, SP, M, MI, CTX>
>

// ===========

export type ClientAttributes<P extends object = object> = P & { className?: string; id?: string }

export type EditorAttributes<P extends object = object> = P & {
	className?: string
	id?: string
	blockStyles: BlockStyles
}

// ===========

type AttributeSource<V> = { type: string; default: V | undefined }
type BlockAttributesConfig<P extends object = object> = {
	[k in keyof ClientAttributes<P>]: AttributeSource<ClientAttributes<P>[k]>
}

// ===========

export type BlockControlsConfig<Props extends object = object> =
	| (
			| {
					panel?: "Advanced" | string
					controls: (ControlConfigType<EditorAttributes<Props>> | BlockControl<Props>)[]
					initialOpen?: boolean
					show?:
						| NestedKeyOf<EditorAttributes<Props>>
						| ((attributes: EditorAttributes<Props>) => boolean)
			  }
			| BlockControl<Props>
	  )[]
	| BlockControl<Props>

export type BlockControl<Props extends object> = FC<{
	attributes: EditorAttributes<Props>
	setAttributes: (attributes: Partial<EditorAttributes<Props>>) => void
}>

// ===========

export type BlockEdit<Props extends object = object> = FC<{
	blockProps: BP<Props>
	Block: FCB<Props>
	blockTitle: string
	setAttributes: (attributes: Partial<EditorAttributes<Props>>) => void
	isSelected?: boolean
	clientId: string
}>

// ===========

type BlockName = `${Lowercase<string>}/${Lowercase<string>}`

export type BlockConfig<Props extends object = object> = {
	title?: string
	description?: string
	icon?: BlockIcon
	blockName: BlockName
	Block: FCB<Props>
	attributes?: BlockAttributesConfig<Props>
	previewAttributes?: ClientAttributes<Props>
	allowedBlocks?: string[]
	Controls?: BlockControlsConfig<Props>
	Edit?: BlockEdit<Props>
	blockStylesConfig?: BlockStylesConfig
}
