import { colorList } from "@/styles/colors"
import { type GridNumType } from "@bring/blocks-client"
import type { Meta, StoryObj } from "@storybook/react"
import GridBlock, { type GridBlockProps } from "./grid.block"

type GridStoryType = {
	columnCount?: GridNumType
	gap?: number
	backgroundImage: string
	className?: string
} & Omit<GridBlockProps, "columnCount" | "gap" | "backgroundImage">

const GridStory = ({ columnCount = 2, gap = 8, backgroundImage, ...attributes }: GridStoryType) => (
	<GridBlock
		attributes={{
			...attributes,
			columnCount: { "": columnCount, lg: columnCount },
			gap: { "": gap },
			backgroundImage: { src: backgroundImage, alt: "", id: 0 },
		}}
	>
		<div className="bg-purple-400 p-4 text-foreground">Content 1</div>
		<div className="bg-purple-400 p-4 text-foreground">Content 2</div>
		<div className="bg-purple-400 p-4 text-foreground">Content 3</div>
	</GridBlock>
)

const meta = {
	title: "Blocks/Layout/Grid",
	component: GridStory,
	tags: ["autodocs"],
	argTypes: {
		backgroundColor: {
			control: { type: "select" },
			options: colorList,
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"The Grid is a layout block for creating a grid view. <br>Column count and gap can be set to create a responsive grid layout. <br>It is useful for displaying items in a grid format like image galleries or just split the content into multiple columns. <br>Grid has all the background options of the Section block.",
			},
		},
	},
} satisfies Meta<GridStoryType>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		columnCount: 2,
		gap: 8,
		backgroundColor: "muted",
		backgroundImage: "https://picsum.photos/1200/900",
		gradient: true,
		parallax: true,
		dark: true,
		className: "",
		containerClassName: "",
	},
}
