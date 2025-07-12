import type { Meta, StoryObj } from "@storybook/react"
import { type ReactNode, useEffect, useState } from "react"
import Footer from "./footer"

// Simple wrapper to handle async Footer component in Storybook
const FooterStory = () => {
	const [FooterComponent, setFooterComponent] = useState<ReactNode>(null)

	useEffect(() => {
		// Render the async Footer component
		const renderFooter = async () => {
			const footerElement = await Footer({})
			setFooterComponent(footerElement)
		}
		void renderFooter()
	}, [])

	return <>{FooterComponent ?? <div>Loading footer...</div>}</>
}

const meta = {
	title: "Components/Layout/Footer",
	component: FooterStory,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"Footer component that displays copyright information and footer menu links. The footer fetches site props including menus and displays the footer menu if available.",
			},
		},
	},
} satisfies Meta<typeof FooterStory>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
