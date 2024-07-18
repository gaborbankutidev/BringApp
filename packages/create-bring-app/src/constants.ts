import path from "path";
import {fileURLToPath} from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const templateDir = __dirname + "/../template";

export const defaultBaseDir = "my-bring-app";
