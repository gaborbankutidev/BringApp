import {twMerge} from "@/utils";
import type {ForwardedRef} from "react";
import {forwardRef} from "react";
import type {IconType} from "react-icons";
import {BiError} from "react-icons/bi";
import {twJoin} from "tailwind-merge";
import {FormControl, FormErrorMessage, FormLabel} from "./form-controls";

const baseStyle = (disabled = false) =>
	twJoin(
		"peer w-full px-5 py-2 pr-12",
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

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string | undefined;
	error?: string | undefined;
	icon?: IconType;
};

export const Input = forwardRef(function Input(
	{className, label, error, icon: Icon, ...props}: InputProps,
	ref: ForwardedRef<HTMLInputElement>,
) {
	return (
		<FormControl className={twMerge(props.disabled && "opacity-50")}>
			{label && <FormLabel>{label}</FormLabel>}
			<div className="relative">
				<input
					ref={ref}
					className={twMerge(
						baseStyle(props.disabled),
						error && "border-red text-red focus:border-red",
						Icon && "pl-[54px]",
						className,
					)}
					{...props}
				/>
				{Icon && (
					<Icon
						size={24}
						className={twMerge(
							"absolute left-4 top-1/2 -translate-y-1/2 transform text-blue-grey transition-all duration-150",
							!(error ?? props.disabled) &&
								"peer-hover:text-orange-200 peer-focus:text-orange-200",
							error && "text-red",
						)}
					/>
				)}
				{error && (
					<BiError
						size={24}
						className="absolute right-2 top-1/2 -translate-y-1/2 transform text-red"
					/>
				)}
			</div>
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
		</FormControl>
	);
});

export const InputRaw = forwardRef(function InputRaw(
	{className, ...props}: React.InputHTMLAttributes<HTMLInputElement>,
	ref: ForwardedRef<HTMLInputElement>,
) {
	return (
		<input ref={ref} className={twMerge(baseStyle(), className)} {...props} />
	);
});
