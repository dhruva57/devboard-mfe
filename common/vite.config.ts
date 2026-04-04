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
        "./ErrorState": "./src/components/ErrorState.tsx",
        "./LoadingState": "./src/components/LoadingState.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
