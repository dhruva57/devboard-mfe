// common/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "common_remote",
      filename: "remoteEntry.js",
      exposes: {
        "./constants": "./src/constants/constants.ts",
      },
      // Simplified shared config for OriginJS
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext", // Required for Top-level await/ESM
    minify: false,
    cssCodeSplit: false,
  },
});
