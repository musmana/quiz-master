import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/quiz-master/",   // 👈 MUST match repo name
  plugins: [react()],
});
