const bringLibConfig = require("@bring/config/lib.js");

module.exports = [
	...bringLibConfig,
	{
		ignores: ["next-app/", "wordpress/"],
	},
];
