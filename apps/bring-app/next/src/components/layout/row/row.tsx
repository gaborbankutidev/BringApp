import {cn} from "@/lib/utils";

export type RowProps = {
	size?: keyof typeof sizes;
} & Omit<React.HTMLProps<HTMLDivElement>, "size">;

export const sizes = {
	"720": "mx-4 md:mx-8 max-w-[720px] min-[784px]:mx-auto",
	"1040": "mx-4 md:mx-8 max-w-[1040px] min-[1080px]:mx-auto",
	"1200": "mx-4 md:mx-8 lg:mx-10 max-w-[1200px] min-[1280px]:mx-auto",
	"1520": "mx-4 md:mx-8 lg:mx-10 max-w-[1520px] min-[1600px]:mx-auto",
	wide: "mx-4 md:mx-8 lg:mx-10", // Without mac width
	full: "mx-0", // WIthout max width and margin
	split: "mx-4 md:ml-8 md:mr-0 lg:ml-10 md:w-2/3 lg:w-1/2",
} as const;

/**
 * The row component is responsible for the container inside a Section component.
 * Sets the margin and max with of the content and provides a grid layout for the Columns.
 */
const Row = ({children, size = "1520", className, ...props}: RowProps) => {
	const classNames = cn("grid gap-8 px-0", sizes[size], className);

	return (
		<div className={classNames} {...props}>
			{children}
		</div>
	);
};

export default Row;
