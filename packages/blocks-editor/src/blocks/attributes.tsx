import type { ImageType, MediaType } from "../types"
import { defaultImageValue, defaultMediaValue } from "../utils"

const attributeSource = <V,>(type: string, initialValue?: V) =>
	({ type, default: initialValue }) as const

// ===========

export const booleanAttributeSource = <T extends boolean>(initialValue?: T) =>
	attributeSource("boolean", initialValue)

export const numberAttributeSource = <T extends number>(initialValue?: T) =>
	attributeSource("number", initialValue)

export const stringAttributeSource = <T extends string>(initialValue?: T) =>
	attributeSource("string", initialValue)

// ===========

export const arrayAttributeSource = <V,>(initialValue: V[] = []) =>
	attributeSource("array", initialValue)

export const objectAttributeSource = <V extends object>(initialValue?: V) =>
	attributeSource("object", initialValue)

export const imageAttributeSource = () => objectAttributeSource<ImageType>(defaultImageValue)

export const mediaAttributeSource = () => objectAttributeSource<MediaType>(defaultMediaValue)
