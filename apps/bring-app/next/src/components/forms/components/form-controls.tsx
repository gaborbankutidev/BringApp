import type {LabelHTMLAttributes, ReactNode} from "react";
import {twJoin} from "tailwind-merge";

export type FormLabelProps = {
	children?: ReactNode;
	className?: string | undefined;
} & LabelHTMLAttributes<HTMLLabelElement>;

export type FormErrorMessageProps = {
	children?: ReactNode;
	className?: string | undefined;
};

export type FormHelperTextProps = {
	children?: ReactNode;
	className?: string | undefined;
};

export type FormControlProps = {
	children?: ReactNode;
	className?: string | undefined;
};

export const FormLabel = ({children, className, ...props}: FormLabelProps) => {
	return (
		<label
			className={twJoin("mb-1 text-14 font-semibold text-grey-800", className)}
			{...props}
		>
			{children}
		</label>
	);
};

export const FormErrorMessage = ({
	children,
	className,
}: FormErrorMessageProps) => {
	return children ? (
		<p className={twJoin("text-11 mt-2 text-right text-red", className)}>
			<span className="font-bold">Hiba!</span> {children}
		</p>
	) : null;
};

export const FormHelperText = ({children, className}: FormHelperTextProps) => {
	return (
		<p className={twJoin("text-grey ml-[26px] text-14", className)}>
			{children}
		</p>
	);
};

export const FormControl = ({children, className}: FormControlProps) => {
	return <div className={twJoin("flex flex-col", className)}>{children}</div>;
};
