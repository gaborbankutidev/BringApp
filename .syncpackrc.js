// @ts-check

/** @type {import("syncpack").RcFile} */
const config = {
	dependencyTypes: ["prod", "dev"],
	semverGroups: [
		{
			label: "use exact version numbers in production",
			packages: ["**"],
			dependencyTypes: ["prod"],
			dependencies: ["**"],
			range: "",
		},
	],
	versionGroups: [
		{
			label: "Use workspace protocol when developing local packages",
			dependencies: [
				"@bring/blocks-client",
				"@bring/blocks-editor",
				"@bring/typescript-config",
			],
			dependencyTypes: ["dev", "prod"],
			pinVersion: "workspace:*",
		},
	],
};

module.exports = config;
