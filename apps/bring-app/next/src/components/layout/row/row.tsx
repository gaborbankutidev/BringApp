import {twMerge} from "@/utils";

export type RowProps = {
	size?: keyof typeof sizes;
} & Omit<React.HTMLProps<HTMLDivElement>, "size">;

export const sizes = {
	"720": "mx-4 md:mx-8 max-w-[720px] min-[784px]:mx-auto",
	"1040": "mx-4 md:mx-8 max-w-[1040px] min-[1080px]:mx-auto",
	"1200": "mx-4 md:mx-8 lg:mx-10 max-w-[1200px] min-[1280px]:mx-auto",
	"1520": "mx-4 md:mx-8 lg:mx-10 max-w-[1520px] min-[1600px]:mx-auto",
	wide: "mx-4 md:mx-8 lg:mx-10",
	full: "mx-0",
} as const;

const Row = ({children, size = "1520", className, ...props}: RowProps) => {
	const classNames = twMerge("grid gap-8 px-0", sizes[size], className);

	return (
		<div className={classNames} {...props}>
			{children}
		</div>
	);
};

export default Row;
