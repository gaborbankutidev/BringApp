import {twMerge} from "@/utils";
import type {ForwardedRef} from "react";
import {forwardRef} from "react";
import {twJoin} from "tailwind-merge";
import {FormControl, FormErrorMessage, FormLabel} from "./form-controls";

const baseStyle = (disabled = false) =>
	twJoin(
		"peer w-full px-5 py-2",
		"border-light rounded-lg border border-blue-grey",
		"placeholder:text-grey-600",
		"bg-grey-100 text-blue-600",
		"focus:border-orange-200",
		"focus:outline-none",
		"focus:ring-0",
		"focus:border-1",
		"focus-visible:outline-0",
		"transition-all duration-150",
		!disabled && "hover:border-orange-200",
	);

export type TextareaProps =
	React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
		label?: string | undefined;
		error?: string | undefined;
	};

export const Textarea = forwardRef(function Textarea(
	{className, label, error, ...props}: TextareaProps,
	ref: ForwardedRef<HTMLTextAreaElement>,
) {
	return (
		<FormControl className={twMerge(props.disabled && "opacity-50")}>
			{label && <FormLabel>{label}</FormLabel>}
			<textarea
				ref={ref}
				className={twMerge(
					baseStyle(props.disabled),
					error && "border-red text-red focus:border-red",
					className,
				)}
				{...props}
			/>

			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</FormControl>
	);
});
