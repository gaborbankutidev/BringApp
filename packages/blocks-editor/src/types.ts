/**
 * Represents a type that excludes the `undefined` type from the given type `T`.
 */
export type Defined<T> = Exclude<T, undefined>

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

// ===========

export type BringNode = {
	key: string
	blockName: string
	attributes: object
	children?: BringNode[]
}

export type WpBlock = {
	clientId: string
	name: string
	attributes: object
	innerBlocks: WpBlock[]
}

// ===========

export type NestedKeyOf<ObjectType extends object> = {
	[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
		? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]> extends infer U extends string ? U : never}`
		: `${Key}`
}[keyof ObjectType & (string | number)]

type DeepRequired<T extends object> = {
	[P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P]
}

type NestedTypedKeyOfOnRequired<ObjectType extends object, T> = {
	[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends T
		? `${Key}`
		: ObjectType[Key] extends object
			? `${Key}.${NestedTypedKeyOfOnRequired<ObjectType[Key], T> extends infer U extends string
					? U
					: never}`
			: never
}[keyof ObjectType & (string | number)]

export type NestedTypedKeyOf<ObjectType extends object, T> = NestedTypedKeyOfOnRequired<
	DeepRequired<ObjectType>,
	T
>
