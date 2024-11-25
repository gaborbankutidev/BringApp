import type {BP} from "@/bring";
import {cn} from "@/lib/utils";
import type {ColorType} from "@/styles/colors";
import type {ImageType} from "@bring/blocks-client";
import type {ReactNode} from "react";
import Section from "./section";

export type SectionBlockProps = {
	children: ReactNode;

	backgroundColor?: ColorType;
	backgroundImage?: ImageType;
	dark?: boolean;

	backgroundImageClassName?: string;
	backgroundClassName?: string;
	containerClassName?: string;
};

const SectionBlock = ({
	children,

	backgroundColor = "transparent",
	backgroundImage,
	dark = false,

	bringStylesClassNames,
	className,
	backgroundImageClassName,
	backgroundClassName,
	containerClassName,
	id,
}: BP<SectionBlockProps>) => (
	<Section
		backgroundImage={
			backgroundImage?.src
				? {
						src: backgroundImage.src,
						alt: backgroundImage.alt ?? "Background image",
					}
				: undefined
		}
		dark={dark}
		className={cn(bringStylesClassNames?.classNames, className)}
		backgroundImageClassName={backgroundImageClassName}
		backgroundClassName={cn(`bg-${backgroundColor}`, backgroundClassName)}
		containerClassName={containerClassName}
		id={id}
	>
		{children}
	</Section>
);

export const section = {
	Component: SectionBlock,
	componentName: "bring/section",
} as const;

export default Section;
