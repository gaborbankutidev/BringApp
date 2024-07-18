import {PackageManager} from "./get-package-manager";

export type CLIConfig = {
	directory: string;
	runInstall: boolean;
	initGit: boolean;
	overwrite: boolean;
	packageManager: PackageManager;
};

export const defaultConfig: CLIConfig = {
	directory: "my-bring-app",
	overwrite: false,
	runInstall: true,
	initGit: true,
	packageManager: "npm",
};
