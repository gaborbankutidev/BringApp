import {editorInit} from "@bring/blocks-editor";

// layout
import column from "@/components/layout/column/column.block";
import group from "@/components/layout/group/group.block";
import row from "@/components/layout/row/row.block";
import section from "@/components/layout/section/section.block";
import split from "@/components/layout/split/split.block";

// components
import button from "@/components/button/button.block";
import divider from "@/components/divider/divider.block";
import embed from "@/components/embed/embed.block";
import contactForm from "@/components/forms/contact/contact.block";
import heading from "@/components/heading/heading.block";
import image from "@/components/image/image.block";
import markdown from "@/components/markdown/markdown.block";

const blockList = [
	// layout
	column,
	group,
	row,
	section,
	split,
	// components
	button,
	contactForm,
	divider,
	embed,
	heading,
	image,
	markdown,
];

editorInit(blockList);
