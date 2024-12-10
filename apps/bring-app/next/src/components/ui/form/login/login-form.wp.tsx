import {
	stringAttributeSource,
	type BlockConfig,
} from "@bring/blocks-editor/blocks";
import {makeOptions} from "@bring/blocks-editor/controls";
import {loginForm, type LoginFormBlockProps} from "./login-form.block";

const loginFormConfig: BlockConfig<LoginFormBlockProps> = {
	...loginForm,
	title: "LoginForm",
	description: "A general login form",
	attributes: {
		title: stringAttributeSource("Login"),
		buttonType: stringAttributeSource("primary"),
		borderRadius: stringAttributeSource("rounded-md"),
		redirectPath: stringAttributeSource("/"),
	},
	Controls: [
		{
			panel: "Settings",
			controls: [
				{type: "text", label: "Text", path: "title", setDefault: false},
				{
					type: "select",
					label: "Button Variant",
					path: "buttonType",
					options: makeOptions([
						"primary",
						"destructive",
						"outline",
						"secondary",
						"ghost",
						"link",
					]),
					defaultValue: "primary",
				},
				{
					type: "select",
					label: "Roundness",
					path: "borderRadius",
					options: makeOptions([
						"rounded-none",
						"rounded-sm",
						"rounded-md",
						"rounded-lg",
						"rounded-full",
					]),
					defaultValue: "rounded-md",
				},
				{
					type: "text",
					label: "Redirect Path",
					path: "redirectPath",
					setDefault: false,
				},
			],
		},
	],
};

export default loginFormConfig;
