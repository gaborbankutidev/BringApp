import fsExtra from "fs-extra";
import kebabCase from "lodash.kebabcase";
import path from "path";

export function updateProjectName(directory: string, projectName: string) {
	const packageJsonPath = path.join(directory, "package.json");
	const composerJsonPath = path.join(directory, "composer.json");
	const packageJson = fsExtra.readJsonSync(packageJsonPath);
	const composerJson = fsExtra.readJsonSync(composerJsonPath);

	packageJson.name = kebabCase(projectName);
	composerJson.name = kebabCase(projectName);

	fsExtra.writeJsonSync(packageJsonPath, packageJson, {spaces: 2});
	fsExtra.writeJsonSync(composerJsonPath, composerJson, {spaces: 2});

	updateProjectThemeName(directory, projectName);
}

function updateProjectThemeName(directory: string, projectName: string) {
	const themeCssPath = path.join(directory, "themes/project-theme/style.css");
	let themeCss = fsExtra.readFileSync(themeCssPath, {
		encoding: "utf-8",
	});

	themeCss = themeCss
		.replace("Project Theme", `${projectName} Theme`)
		.replace("project-theme", `${kebabCase(projectName)}-theme`);

	fsExtra.writeFileSync(themeCssPath, themeCss);

	fsExtra.renameSync(
		path.join(directory, "themes/project-theme"),
		path.join(directory, `themes/${kebabCase(projectName)}-theme`),
	);
}
