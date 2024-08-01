import fs from "fs";

const CWD = process.cwd();

const packageJsonString = fs.readFileSync(`${CWD}/package.json`, "utf8");
const packageJson = JSON.parse(packageJsonString);

const version = packageJson.version;

const composerJsonString = fs.readFileSync(`${CWD}/composer.json`, "utf8");
const composerJson = JSON.parse(composerJsonString);

composerJson.version = version;

fs.writeFileSync(`${CWD}/composer.json`, JSON.stringify(composerJson, null, 2));
