import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"],

  minify: true,
  dts: false,
  clean: true,
  target: "node20",
});
