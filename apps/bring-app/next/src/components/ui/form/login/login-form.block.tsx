import {BP} from "@/bring";
import LoginForm from "./login-form";

export type LoginFormBlockProps = {
	title?: string;
	buttonType?:
		| "primary"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link";
	borderRadius?:
		| "rounded-none"
		| "rounded-sm"
		| "rounded-md"
		| "rounded-lg"
		| "rounded-full";
	redirectPath?: string;
};

export const LoginFormBlock = ({
	attributes: {...props},
}: BP<LoginFormBlockProps>) => {
	return <LoginForm {...props} />;
};

export const loginForm = {
	Block: LoginFormBlock,
	blockName: "bring/login-form",
} as const;

export default LoginForm;
