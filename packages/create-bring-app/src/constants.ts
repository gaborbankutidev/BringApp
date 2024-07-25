/**
 * DO NOT MOVE THIS FILE
 */

import path from "path";
import {fileURLToPath} from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

export const templateDir = path.join(ROOT, "./template");

export const defaultBaseDir = "my-bring-app";
