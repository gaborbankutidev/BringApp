import type { EntityProps } from "@/bring/types"
import type { EntityProps as BringEntityProps } from "@bring/blocks-client/types"

export const mockEntityProps: BringEntityProps<EntityProps> = {
	entityType: "post",
	entitySlug: "page",
	entityId: 1,
	slug: "sample-entity-slug",
	url: "/sample-entity-slug",
	editUrl: null,

	name: "Sample entity name",
	excerpt:
		"Sample entity excerpt - **lorem ipsum dolor** sit amet consectetur adipisicing elit. Quisquam, quos.",
	description:
		"Sample entity description - Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. **Sed do eiusmod tempor incididunt** ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
	image: {
		id: 0,
		src: "https://picsum.photos/1200/900",
		alt: "Sample image",
	},
	tags: [
		{
			id: "1",
			name: "lorem ipsum",
			slug: "lorem-ipsum",
		},
		{
			id: "2",
			name: "amet consectetur",
			slug: "amet-consectetur",
		},
		{
			id: "3",
			name: "dolor sit amet",
			slug: "dolor-sit-amet",
		},
	],
}
