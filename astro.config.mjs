// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://frsswq.github.io",
  base: "plus-jakarta-site-redesign",
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("opentype.js")) {
              return "opentype";
            }
            if (id.includes("q5")) {
              return "q5";
            }
            if (id.includes("node_modules")) {
              return "vendor";
            }
            if (id.includes("/src/")) {
              return "app";
            }
          },
        },
      },
    },
  },
});
