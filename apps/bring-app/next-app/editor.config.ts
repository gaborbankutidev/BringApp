// samples
import basic from "@/components/samples/basic/basic.wp"

// layout
import flex from "@/components/layout/flex/flex.wp"
import grid from "@/components/layout/grid/grid.wp"
import section from "@/components/layout/section/section.wp"

// components
import button from "@/components/button/button.wp"
import divider from "@/components/divider/divider.wp"
import embed from "@/components/embed/embed.wp"
import heading from "@/components/heading/heading.wp"
import image from "@/components/image/image.wp"
import markdown from "@/components/markdown/markdown.wp"

import Editor from "@bring/blocks-editor"

const blockList = [
	// samples
	basic,
	// layout
	flex,
	grid,
	section,
	// components
	button,
	divider,
	embed,
	heading,
	image,
	markdown,
]

Editor.init(blockList)
