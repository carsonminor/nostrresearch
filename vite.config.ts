import path from "node:path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite"; // use Vite's defineConfig for the build config
import type { UserConfig } from "vite";
import { mergeConfig } from "vite";
import { defineConfig as defineTestConfig } from "vitest/config";

// https://vitejs.dev/config/
const baseConfig: UserConfig = {
  base: "/nostrresearch/", // <-- ensures assets load correctly under the repo subpath
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};

// Vitest-specific additions
const testConfig = defineTestConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    onConsoleLog(log) {
      return !log.includes("React Router Future Flag Warning");
    },
    env: {
      DEBUG_PRINT_LIMIT: "0", // Suppress DOM output that exceeds AI context windows
    },
  },
});

export default defineConfig(() => mergeConfig(baseConfig, testConfig));
