import type { BP } from "@/bring"
import Background, { type BackgroundBlockProps } from "@/components/background/background.block"
import { type ContainerSizeType } from "@/styles/container"
import Section from "./section"

export type SectionBlockProps = {
	dark?: boolean
	containerSize?: ContainerSizeType
} & BackgroundBlockProps

const SectionBlock = ({ attributes: props, children }: BP<SectionBlockProps>) => (
	<Background defaultBackgroundColor="background" {...props}>
		<Section>{children}</Section>
	</Background>
)

export const section = {
	Block: SectionBlock,
	blockName: "bring/section",
	blockStylesConfig: {
		spacing: {
			p: {
				t: { "": 8 },
				b: { "": 8 },
			},
		},
		visibility: { "": "block", md: "block", lg: "block" },
	},
} as const

export default SectionBlock
