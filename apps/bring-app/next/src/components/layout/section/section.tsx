import {twMerge} from "@/utils";
import Image, {type ImageProps} from "next/image";

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

export default Section;
