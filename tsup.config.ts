import { defineConfig } from "tsup";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig(({ watch = false }) => ({
  entry: {
    index: "./src/index.ts",
  },
  clean: true,
  dts: true,
  format: ["cjs", "esm"],
  minify: isProduction,
  outDir: "dist",
  watch,
}));
