import type {ForwardedRef} from "react";
import {forwardRef} from "react";
import {twJoin} from "tailwind-merge";
import {FormControl, FormErrorMessage, FormLabel} from "./form-controls";

export type RadioProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"type"
> & {
	label?: string | undefined;
	error?: string | undefined;
};

const Dot = ({checked}: {checked: boolean}) => (
	<span
		className={twJoin(
			"block h-[18px] w-[18px] rounded-full",
			checked ? "bg-red" : "border-2 border-red bg-white",
		)}
	/>
);

export const Radio = forwardRef(function Radio(
	{checked = false, label, error, ...props}: RadioProps,
	ref: ForwardedRef<HTMLInputElement>,
) {
	return (
		<FormControl>
			<FormLabel>
				{label}
				<input
					ref={ref}
					type="radio"
					checked={checked}
					{...props}
					className="hidden"
				/>
				<Dot checked={checked} />
			</FormLabel>
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</FormControl>
	);
});
