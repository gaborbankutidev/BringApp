import {twMerge} from "@/utils";
import type {ForwardedRef} from "react";
import {forwardRef, Fragment} from "react";
import {twJoin} from "tailwind-merge";
import {FormControl, FormErrorMessage, FormLabel} from "./form-controls";

const baseStyle = twJoin(
	"px-6 py-2",
	"border-light rounded-full border",
	"placeholder:text-grey",
	"hover:border-grey",

	"focus:border-orange",
	"focus:placeholder:text-fill1",
	"focus:outline-none",
	"focus:ring-0",
	"focus:border-1",
	"focus-visible:outline-0",

	"transition-all duration-150",
);

export type PasswordInputProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"type"
> & {
	label?: string | undefined;
	error?: string | undefined;
};

export const Input = forwardRef(function Input(
	{className, label, error, ...props}: PasswordInputProps,
	ref: ForwardedRef<HTMLInputElement>,
) {
	const LabelOrFragment = label ? FormLabel : Fragment;
	return (
		<FormControl>
			<LabelOrFragment>
				{label}
				<input
					type="password"
					ref={ref}
					className={twMerge(baseStyle, className)}
					{...props}
				/>
			</LabelOrFragment>
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</FormControl>
	);
});
