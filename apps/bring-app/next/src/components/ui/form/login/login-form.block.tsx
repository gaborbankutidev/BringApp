import {BP} from "@/bring";
import LoginForm from "./login-form";

export type LoginFormBlockProps = {
	title: string;
	redirectPath?: string;
};

export const LoginFormBlock = ({
	attributes: {title, ...props},
}: BP<LoginFormBlockProps>) => {
	return <LoginForm {...props}>{title}</LoginForm>;
};

export const loginForm = {
	Block: LoginFormBlock,
	blockName: "bring/login-form",
} as const;

export default LoginFormBlock;
