// layout
import column from "@/components/layout/column/column.wp"
import group from "@/components/layout/group/group.wp"
import row from "@/components/layout/row/row.wp"
import section from "@/components/layout/section/section.wp"
import split from "@/components/layout/split/split.wp"

// components
import divider from "@/components/divider/divider.wp"
import embed from "@/components/embed/embed.wp"
import heading from "@/components/heading/heading.wp"
import image from "@/components/image/image.wp"
import markdown from "@/components/markdown/markdown.wp"
import button from "@/components/ui/button/button.wp"

import { env } from "@/env.mjs"
import Editor from "@bring/blocks-editor"

const blockList = [
	// layout
	column,
	group,
	row,
	section,
	split,
	// components
	button,
	divider,
	embed,
	heading,
	image,
	markdown,
]

Editor.init(env.NEXT_PUBLIC_WP_BASE_URL, blockList)
