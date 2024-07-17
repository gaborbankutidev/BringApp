import type {ForwardedRef, ReactNode} from "react";
import {forwardRef} from "react";
import {FormControl, FormErrorMessage, FormLabel} from "./form-controls";

export type CheckBoxProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"type"
> & {
	label?: ReactNode | undefined;
	error?: string | undefined;
};

export const Checkbox = forwardRef(function Input(
	{className, label, error, ...props}: CheckBoxProps,
	ref: ForwardedRef<HTMLInputElement>,
) {
	return (
		<>
			<FormControl className={className}>
				<div className="flex items-center gap-3.5">
					<input
						ref={ref}
						type="checkbox"
						className="h-4 w-4 cursor-pointer rounded-md bg-grey-100 p-2 text-blue-600 focus:ring-0"
						{...props}
					/>
					{label && (
						<FormLabel className="mt-1.5" htmlFor={props.id}>
							{label}
						</FormLabel>
					)}
				</div>

				{error && <FormErrorMessage>{error}</FormErrorMessage>}
			</FormControl>
		</>
	);
});
