export const directionList = ["vertical", "horizontal"] as const
export type DirectionType = (typeof directionList)[number]

export const arrowDirectionList = ["up", "down", "left", "right"] as const
export type ArrowDirectionType = (typeof arrowDirectionList)[number]

export const textAlignList = ["left", "center", "right", "justify"] as const
export type TextAlignType = (typeof textAlignList)[number]

export const sourceList = ["manual", "dynamic"] as const
export type SourceType = (typeof sourceList)[number]

export const textSourceList = ["manual", "name", "excerpt", "description"] as const
export type TextSourceType = (typeof textSourceList)[number]

export const justifyList = [
	"flex-start",
	"center",
	"flex-end",
	"space-between",
	"space-around",
	"space-evenly",
] as const
export type JustifyType = (typeof justifyList)[number]

export const alignList = ["flex-start", "center", "flex-end", "stretch", "baseline"] as const
export type AlignType = (typeof alignList)[number]

export const entityTypeList = ["post", "taxonomy", "author"]
export const postList = ["post", "page"]
export const taxonomyList = ["category", "tag"]
