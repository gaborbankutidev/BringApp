import {
	stringAttributeSource,
	type BlockConfig,
} from "@bring/blocks-editor/blocks";
import {loginForm, type LoginFormBlockProps} from "./login-form.block";

const buttonConfig: BlockConfig<LoginFormBlockProps> = {
	...loginForm,
	title: "LoginForm",
	description: "A general login form",
	attributes: {
		title: stringAttributeSource("Login"),
	},
	Controls: [
		{
			panel: "Settings",
			controls: [
				{type: "text", label: "Text", path: "title", setDefault: false},
			],
		},
	],
};

export default buttonConfig;
