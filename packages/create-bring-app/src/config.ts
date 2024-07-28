import {PackageManager} from "./get-package-manager";

export type CLIConfig = {
	projectName: string;
	directory: string;
	runInstall: boolean;
	initGit: boolean;
	overwrite: boolean;
	packageManager: PackageManager;
};
