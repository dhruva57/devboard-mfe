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
        name: "mfeDashboard",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App",
        },
        remotes: {
          common_remote: env.VITE_COMMON_REMOTE,
        },
        shared: ["react", "react-dom", "react-router-dom", "recharts"],
      }),
    ],
    server: {
      port: 5003,
    },
    preview: {
      port: 5003,
    },
    build: {
      target: "esnext",
      modulePreload: false,
      minify: false,
      cssCodeSplit: false,
    },
  };
});
