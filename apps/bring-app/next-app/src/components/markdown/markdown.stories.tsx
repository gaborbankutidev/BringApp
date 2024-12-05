import type { Meta, StoryObj } from "@storybook/react"

import Markdown from "./markdown"

const contentSample = `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### heading 5
###### heading 6

Hello world! This is **bold** and this is *italic* and this a ${"`"}code item ${"`"}

And this is a [link](https://thebringteam.com)

And this is a [link](https://thebringteam.com "--newTab") that opens on a new tab!

## Heading for paragraph
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non velit vestibulum, molestie elit ut, maximus nunc. Aliquam velit urna, egestas sit amet egestas non, ornare sed eros. Praesent est felis, aliquet id vulputate ut, scelerisque faucibus sem. Morbi leo odio, semper sed vulputate et, faucibus non sem. 

![alt](https://template.thebringteam.com/wp-content/uploads/screenshot.jpg)

This is an ordered list:
1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
2. Nullam non velit vestibulum, molestie elit ut, maximus nunc. Aliquam velit urna, egestas sit amet egestas non, ornare sed eros.
3. Praesent est felis, aliquet id vulputate ut, scelerisque faucibus sem. Morbi leo odio, semper sed vulputate et, faucibus non sem.

This is an unordered list:  
- Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
- Nullam non velit vestibulum, molestie elit ut, maximus nunc. Aliquam velit urna, egestas sit amet egestas non, ornare sed eros.
- Praesent est felis, aliquet id vulputate ut, scelerisque faucibus sem. Morbi leo odio, semper sed vulputate et, faucibus non sem. 

And a block quote:
> Suspendisse tellus purus, pulvinar non ante ac, luctus euismod eros. Aenean laoreet tortor metus, eu ultricies dolor tristique congue. In eu libero nulla.

A line break here  
and a line:

---
`

const inlineContentSample = `Hello world! 
This is **bold** and this is *italic* and this a ${"`"}code item ${"`"} ^sup^
and this is a [link](https://thebringteam.com) 
and this is a [link](https://thebringteam.com "--newTab") that opens on a new tab!
`

const meta = {
	title: "Components/Markdown",
	component: Markdown,
	tags: ["autodocs"],
} satisfies Meta<typeof Markdown>

export default meta
type Story = StoryObj<typeof meta>

export const Full: Story = {
	args: {
		content: contentSample,
		className: "md",
	},
}

export const Line: Story = {
	args: {
		content: inlineContentSample,
	},
}
