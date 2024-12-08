import {zodResolver} from "@hookform/resolvers/zod";
import * as React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";

type BaseProps = {
	asChild?: boolean;
};

type FormProps = {} & BaseProps & React.FormHTMLAttributes<HTMLFormElement>;

// Define the login form schema
const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

// Login form component
const LoginForm = React.forwardRef<FormProps>((ref) => {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<LoginFormInputs>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
		console.log("Login data: ", data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col space-y-4 max-w-sm mx-auto"
			ref={ref as React.Ref<HTMLFormElement>}
		>
			<div>
				<label htmlFor="email" className="block text-sm font-medium">
					Email
				</label>
				<input
					id="email"
					type="email"
					className="border p-2 w-full"
					{...register("email")}
				/>
				{errors.email && (
					<p className="text-red-600 text-sm">{errors.email.message}</p>
				)}
			</div>

			<div>
				<label htmlFor="password" className="block text-sm font-medium">
					Password
				</label>
				<input
					id="password"
					type="password"
					className="border p-2 w-full"
					{...register("password")}
				/>
				{errors.password && (
					<p className="text-red-600 text-sm">{errors.password.message}</p>
				)}
			</div>

			<button
				type="submit"
				className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
			>
				Login
			</button>
		</form>
	);
});
LoginForm.displayName = "LoginForm";

export default LoginForm;
