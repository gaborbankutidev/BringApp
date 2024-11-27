const bringLibConfig = require("@bring/config/lib.js");

module.exports = [
	...bringLibConfig,
	{
		ignores: ["packages/", "apps/"],
	},
];
