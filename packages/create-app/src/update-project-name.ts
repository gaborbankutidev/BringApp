import fsExtra from "fs-extra";
import path from "path";
import {kebabCase} from "./utils";

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
	const initialProjectTheme = "Project Theme";
	const initialProjectThemeSlug = "project-theme";

	const projectTheme = projectName;
	const projectThemeSlug = kebabCase(projectName);

	// Update theme name in style.css
	const themeCssPath = path.join(directory, `themes/${initialProjectThemeSlug}/style.css`);
	const themeCss = fsExtra.readFileSync(themeCssPath, {
		encoding: "utf-8",
	});

	fsExtra.writeFileSync(
		themeCssPath,
		themeCss
			.replaceAll(initialProjectTheme, projectTheme)
			.replaceAll(initialProjectThemeSlug, projectThemeSlug),
	);

	// Rename theme directory
	fsExtra.renameSync(
		path.join(directory, `themes/${initialProjectThemeSlug}`),
		path.join(directory, `themes/${projectThemeSlug}`),
	);

	// Update theme name in next/package.json
	const nextPackageJsonPath = path.join(directory, "next/package.json");
	const nextPackageJson = fsExtra.readFileSync(nextPackageJsonPath, {
		encoding: "utf-8",
	});

	fsExtra.writeFileSync(
		nextPackageJsonPath,
		nextPackageJson.replaceAll(initialProjectThemeSlug, projectThemeSlug),
	);

	// Update theme name in compose.yml
	const dockerComposePath = path.join(directory, "compose.yml");
	const dockerCompose = fsExtra.readFileSync(dockerComposePath, {
		encoding: "utf-8",
	});

	fsExtra.writeFileSync(
		dockerComposePath,
		dockerCompose.replaceAll(initialProjectThemeSlug, projectThemeSlug),
	);

	// Update theme name in deploy.sh
	const deployShPath = path.join(directory, "deploy.sh");
	const deploySh = fsExtra.readFileSync(deployShPath, {
		encoding: "utf-8",
	});

	fsExtra.writeFileSync(
		deployShPath,
		deploySh.replaceAll(initialProjectThemeSlug, projectThemeSlug),
	);
}
