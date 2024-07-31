import fsExtra from "fs-extra";
import kebabCase from "lodash.kebabcase";
import path from "path";

export function updateProjectName(directory: string, projectName: string) {
	const packageJsonPath = path.join(directory, "package.json");
	const composerJsonPath = path.join(directory, "composer.json");
	const packageJson = fsExtra.readJsonSync(packageJsonPath);
	const composerJson = fsExtra.readJsonSync(composerJsonPath);

	packageJson.name = kebabCase(projectName);
	composerJson.name = `${kebabCase(projectName)}/theme`;

	fsExtra.writeJsonSync(packageJsonPath, packageJson, {spaces: 2});
	fsExtra.writeJsonSync(composerJsonPath, composerJson, {spaces: 2});

	updateProjectThemeName(directory, projectName);
}

function updateProjectThemeName(directory: string, projectName: string) {
	const projectTheme = projectName;
	const projectThemeKebab = kebabCase(projectName);

	// Update theme name in style.css
	const themeCssPath = path.join(directory, "themes/project-theme/style.css");
	const themeCss = fsExtra.readFileSync(themeCssPath, {
		encoding: "utf-8",
	});

	fsExtra.writeFileSync(
		themeCssPath,
		themeCss.replace("Project Theme", projectTheme).replace("project-theme", projectThemeKebab),
	);

	// Rename theme directory
	fsExtra.renameSync(
		path.join(directory, "themes/project-theme"),
		path.join(directory, `themes/${projectThemeKebab}`),
	);

	// Update theme name in next/package.json
	const nextPackageJsonPath = path.join(directory, "next/package.json");
	const nextPackageJson = fsExtra.readFileSync(nextPackageJsonPath, {
		encoding: "utf-8",
	});

	fsExtra.writeFileSync(
		nextPackageJsonPath,
		nextPackageJson.replace("project-theme", projectThemeKebab),
	);

	// Update theme name in docker-compose.yml
	const dockerComposePath = path.join(directory, "docker-compose.yml");
	const dockerCompose = fsExtra.readFileSync(dockerComposePath, {
		encoding: "utf-8",
	});

	fsExtra.writeFileSync(
		dockerComposePath,
		dockerCompose.replace("project-theme", projectThemeKebab),
	);

	// Update theme name in deploy.sh
	const deployShPath = path.join(directory, "deploy.sh");
	const deploySh = fsExtra.readFileSync(deployShPath, {
		encoding: "utf-8",
	});

	fsExtra.writeFileSync(deployShPath, deploySh.replace("project-theme", projectThemeKebab));
}
