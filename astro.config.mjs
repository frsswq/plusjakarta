// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

import icon from "astro-icon";

export default defineConfig({
  site: "https://frsswq.github.io",
  base: "plus-jakarta-site-redesign",

  vite: {
    plugins: [tailwindcss()],
    css: {
      transformer: "lightningcss",
    },
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
            if (id.includes("react")) {
              return "react";
            }
          },
        },
      },
    },
  },

  integrations: [react(), icon()],
});
