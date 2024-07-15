const js = "js,cjs,mjs,ts,tsx";
const css = "css,scss,sass,less";
const php = "php";
const yml = "yml,yaml";
const md = "md,mdx";

const config = {
	[`*.{json,prisma,${md},${yml},${css},${js},${php}}`]: "prettier --write",
	[`*.${js}`]: ["prettier --write", "eslint --fix"],
};

module.exports = config;
