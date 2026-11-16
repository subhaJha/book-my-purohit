import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "BOOKING_");
  const target = env.BOOKING_API_URL || "http://127.0.0.1:8000";
  const proxy = { "/api": { target, changeOrigin: true } };

  return {
    plugins: [react(), tailwindcss()],
    server: { proxy },
    preview: { proxy },
  };
});
