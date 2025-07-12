export type TagType = {
	id: string
	name: string
	slug: string
}

export type PageDynamicEntityProps = {
	tags: TagType[]
}

export type PostDynamicEntityProps = {
	tags: TagType[]
}
