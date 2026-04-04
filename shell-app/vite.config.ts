import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log({ mfeDashboard: env.VITE_DASHBOARD_REMOTE });

  return {
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: "shellApp",
        remotes: {
          mfeTasks: env.VITE_TASKS_REMOTE,
          mfeDashboard: env.VITE_DASHBOARD_REMOTE,
          common_remote: env.VITE_COMMON_REMOTE,
        },
        shared: ["react", "react-dom", "react-router-dom", "recharts"],
      }),
    ],
    server: {
      port: 5173,
    },
    preview: {
      port: 5173,
    },
    build: {
      target: "esnext",
      modulePreload: false,
    },
  };
});
