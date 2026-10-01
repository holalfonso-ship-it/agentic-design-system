/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    css: false,
    coverage: {
      provider: "v8",
      include: ["src/components/**/*.tsx", "src/tokens/**/*.ts"],
      exclude: ["src/**/*.stories.tsx", "src/**/*.test.tsx", "src/**/index.ts"],
      reporter: ["text", "html"],
    },
  },
});
