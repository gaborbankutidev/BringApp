import type {BP} from "@/bring";
import type {ColorType} from "@/styles";
import {twJoin, twMerge} from "@/utils";
import type {ImageType} from "@bring/blocks-client";
import Image, {type ImageProps} from "next/image";
import type {ReactNode} from "react";

type SectionProps = {
	backgroundImage?: Pick<ImageProps, "src" | "alt">;
	dark?: boolean;
	className?: string;
	backgroundImageClassName?: string;
	backgroundClassName?: string;
	containerClassName?: string;
} & React.HTMLProps<HTMLDivElement>;

const baseStye = "relative bg-no-repeat bg-cover overflow-hidden bg-center";
const bgImageBaseStyle =
	"absolute w-full h-full top-0 left-0 bg-no-repeat bg-cover bg-center bg-fixed";
const bgBaseStyle = "absolute w-full h-full top-0 left-0";
const containerBaseStyle = "relative";

const Section = ({
	children,
	backgroundImage,
	dark = false,

	className,
	backgroundImageClassName,
	backgroundClassName,
	containerClassName,
	...props
}: SectionProps) => {
	const cn = twMerge(baseStye, className);

	const bgImageCn = twMerge(bgImageBaseStyle, backgroundImageClassName);

	const bgCn = twMerge(
		bgBaseStyle,
		backgroundImage && "opacity-80",
		backgroundClassName,
	);

	const containerCn = twMerge(containerBaseStyle, containerClassName);

	return (
		<section
			className={cn}
			{...props}
			data-theme={dark ? "eld-dark" : "eld-light"}
		>
			{backgroundImage && (
				<div className={bgImageCn}>
					<Image
						src={backgroundImage?.src}
						alt={backgroundImage?.alt}
						fill
						style={{objectFit: "cover"}}
						priority
					/>
				</div>
			)}
			<div className={bgCn} />
			<div className={containerCn}>{children}</div>
		</section>
	);
};

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
		className={twJoin(bringStylesClassNames?.classNames, className)}
		backgroundImageClassName={backgroundImageClassName}
		backgroundClassName={twJoin(`bg-${backgroundColor}`, backgroundClassName)}
		containerClassName={containerClassName}
		id={id}
	>
		{children}
	</Section>
);

export const section = {Component: SectionBlock, componentName: "Section"};

export default Section;
