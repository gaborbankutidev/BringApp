"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import * as React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {BiSolidShow} from "react-icons/bi";
import {z} from "zod";
import Button from "../../button";
import type {LoginFormBlockProps} from "./login-form.block";

type FormProps = {} & LoginFormBlockProps &
	React.FormHTMLAttributes<HTMLFormElement>;

// Define the login form schema
const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

// Login form component
const LoginForm = React.forwardRef<HTMLFormElement, FormProps>(
	({title, buttonType, borderRadius, redirectPath}: FormProps, ref) => {
		const {
			register,
			handleSubmit,
			formState: {errors},
		} = useForm<LoginFormInputs>({
			resolver: zodResolver(loginSchema),
		});

		const router = useRouter();
		const [passwordType, setPasswordType] = React.useState("password");
		const [isLoading, setIsLoading] = React.useState(false);

		// Handle form submission
		const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
			setIsLoading(true);
			console.log("Login data: ", data);
			if (redirectPath) router.push(redirectPath);
		};

		// Toggle password visibility
		const togglePasswordVisibility = (
			event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		) => {
			event.preventDefault();
			setPasswordType(passwordType === "password" ? "text" : "password");
		};

		return (
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col space-y-4 max-w-sm mx-auto"
				ref={ref as React.Ref<HTMLFormElement>}
			>
				<div>
					<h2 className="text-center mb-4">{title}</h2>
					<label htmlFor="email" className="block font-medium">
						Email
					</label>
					<input
						id="email"
						type="email"
						className={`border p-2 w-full text-black focus:border-purple-600 border-transparent focus:ring-0 ${borderRadius}`}
						{...register("email")}
					/>
					{errors.email && (
						<p className="text-red-600 text-14 rounded-lg">
							{errors.email.message}
						</p>
					)}
				</div>

				<div>
					<label htmlFor="password" className="block font-medium">
						Password
					</label>
					<div className="relative">
						<input
							id="password"
							type={passwordType}
							className={`border p-2 w-full text-black focus:border-purple-600 border-transparent focus:ring-0 ${borderRadius}`}
							{...register("password")}
						/>
						<button
							onClick={(e) => togglePasswordVisibility(e)}
							className="absolute right-1 top-1/2 transform -translate-y-1/2"
						>
							<BiSolidShow
								size={32}
								className="text-gray-500 hover:text-purple-600 transition-all duration-300"
							/>
						</button>
					</div>

					{errors.password && (
						<p className="text-red-600 text-14">{errors.password.message}</p>
					)}
				</div>

				<Button as="button" variant={buttonType} size="md" type="submit">
					Login {isLoading && "..."}
				</Button>
			</form>
		);
	},
);
LoginForm.displayName = "LoginForm";

export default LoginForm;
