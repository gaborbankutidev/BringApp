import type { Meta, StoryObj } from "@storybook/react"

const Fonts = () => (
	<div className="space-y-12 p-8">
		{/* Headings Section */}
		<section>
			<h2 className="mb-6 text-26s font-bold text-gray-900">Heading Styles</h2>
			<div className="space-y-4">
				<div className="border-l-4 border-gray-500 pl-4">
					<h1>This is a Heading 1 (H1)</h1>
					<p className="mt-2">Used for main page titles and primary headings</p>
				</div>

				<div className="border-l-4 border-gray-500 pl-4">
					<h2>This is a Heading 2 (H2)</h2>
					<p className="mt-2">Used for section titles and secondary headings</p>
				</div>

				<div className="border-l-4 border-gray-500 pl-4">
					<h3>This is a Heading 3 (H3)</h3>
					<p className="mt-2">Used for subsection titles and tertiary headings</p>
				</div>

				<div className="border-l-4 border-gray-500 pl-4">
					<h4>This is a Heading 4 (H4)</h4>
					<p className="mt-2">Used for smaller section titles</p>
				</div>

				<div className="border-l-4 border-gray-500 pl-4">
					<h5>This is a Heading 5 (H5)</h5>
					<p className="mt-2">Used for minor headings and labels</p>
				</div>

				<div className="border-l-4 border-gray-500 pl-4">
					<h6>This is a Heading 6 (H6)</h6>
					<p className="mt-2">Used for the smallest headings</p>
				</div>
			</div>
		</section>

		{/* Headline Styles Section */}
		<section>
			<h2 className="mb-6 text-26s font-bold text-gray-900">Headline Styles</h2>
			<div className="space-y-4">
				<div className="border-l-4 border-gray-500 pl-4">
					<p className="hl1">This is a Headline Line 1 (HL1)</p>
					<p className="mt-2 text-14 text-gray-600">
						Medium weight, larger text for prominent headlines
					</p>
				</div>

				<div className="border-l-4 border-gray-500 pl-4">
					<p className="hl2">This is a Headline Line 2 (HL2)</p>
					<p className="mt-2 text-14 text-gray-600">
						Medium weight, medium text for secondary headlines
					</p>
				</div>
			</div>
		</section>

		{/* Body Text Section */}
		<section>
			<h2 className="mb-6 text-26s font-bold text-gray-900">Body Text</h2>
			<div className="light space-y-6">
				<div>
					<h3 className="mb-3">Default Body Text</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
						dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
						Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
						mollit anim id est laborum.
					</p>
				</div>
				<div>
					<h3 className="mb-3">Markdown Body Text</h3>
					<p className="md">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
						dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
						Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
						mollit anim id est laborum.
					</p>
				</div>
			</div>
		</section>

		{/* Typography Scale Section */}
		<section>
			<h2 className="mb-6 text-26s font-bold text-gray-900">Typography Scale</h2>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div className="space-y-4">
					<h3 className="mb-4 text-18s font-semibold">Heading Sizes</h3>
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<span className="text-14 text-gray-600">H1:</span>
							<span className="font-mono text-14">text-28s</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-14 text-gray-600">H2:</span>
							<span className="font-mono text-14">text-26s</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-14 text-gray-600">H3:</span>
							<span className="font-mono text-14">text-18s</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-14 text-gray-600">H4:</span>
							<span className="font-mono text-14">text-18s</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-14 text-gray-600">H5:</span>
							<span className="font-mono text-14">text-15s</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-14 text-gray-600">H6:</span>
							<span className="font-mono text-14">text-13</span>
						</div>
					</div>
				</div>

				<div className="space-y-4">
					<h3 className="mb-4 text-18s font-semibold">Headline Sizes</h3>
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<span className="text-14 text-gray-600">HL1:</span>
							<span className="font-mono text-14">text-22</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-14 text-gray-600">HL2:</span>
							<span className="font-mono text-14">text-18</span>
						</div>
					</div>

					<h3 className="mb-4 mt-6 text-18s font-semibold">Body Text</h3>
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<span className="text-14 text-gray-600">Default:</span>
							<span className="font-mono text-14">text-16</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-14 text-gray-600">Large line height:</span>
							<span className="font-mono text-14">text-16l</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-14 text-gray-600">Small line height:</span>
							<span className="font-mono text-14">text-16s</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		{/* Line Height Examples Section */}
		<section>
			<h2 className="mb-6 text-26s font-bold text-gray-900">Line Height Examples</h2>
			<div className="space-y-6">
				<div>
					<h3 className="mb-3 text-18s font-semibold">Default Line Height (text-16)</h3>
					<p className="text-16 text-gray-700">
						This is the default body text with standard line height. It&apos;s perfect for most
						content and provides good readability without being too spaced out. This is the
						recommended choice for general body text and shorter content blocks.
					</p>
				</div>

				<div>
					<h3 className="mb-3 text-18s font-semibold">Large Line Height (text-16l)</h3>
					<p className="text-16l text-gray-700">
						This is body text with large line height, providing more breathing room between lines.
						It&apos;s excellent for longer content blocks like blog posts, articles, or any text
						that requires extended reading. The increased spacing helps reduce eye strain and
						improves overall readability for dense content.
					</p>
				</div>

				<div>
					<h3 className="mb-3 text-18s font-semibold">Small Line Height (text-16s)</h3>
					<p className="text-16s text-gray-700">
						This is body text with small line height, creating tighter spacing between lines.
						It&apos;s ideal for headers, labels, or content where you want to maximize space
						efficiency while maintaining readability. Perfect for UI elements and compact layouts.
					</p>
				</div>
			</div>
		</section>
	</div>
)

const meta = {
	title: "StyleGuide/Fonts",
	component: Fonts,
	tags: ["autodocs"],
} satisfies Meta<typeof Fonts>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
