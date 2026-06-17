/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The deploy target is a GitHub Pages *project* site served from
// https://<owner>.github.io/<repo>/, so assets must be requested from that
// sub-path in production. Locally (dev/preview) we serve from root.
// CI sets BASE_PATH="/<repo>/"; everything else defaults to "/".
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    css: false,
  },
});
