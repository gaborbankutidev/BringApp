import type { BP } from "@/bring/types"
import Background, { type BackgroundBlockProps } from "@/components/background/background.block"
import { cn } from "@/lib/utils"
import { type ContainerSizeType } from "@/styles/container"
import Section from "./section"

export type SectionBlockProps = {
	dark?: boolean
	containerSize?: ContainerSizeType
} & BackgroundBlockProps

const SectionBlock = ({
	attributes: { className, dark, ...props },
	children,
}: BP<SectionBlockProps>) => (
	<Background defaultBackgroundColor="background" {...props}>
		<Section className={cn(dark === true && "dark", dark === false && "light", className)}>
			{children}
		</Section>
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
