import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: "mfeTasks",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App",
        },
        remotes: {
          common_remote: env.VITE_COMMON_REMOTE,
        },
        shared: ["react", "react-dom"],
      }),
    ],
    server: {
      port: 5001,
    },
    preview: {
      port: 5001,
    },
    build: {
      target: "esnext",
      modulePreload: false,
      minify: false,
      cssCodeSplit: false,
    },
  };
});
