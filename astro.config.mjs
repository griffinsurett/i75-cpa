// astro.config.mjs
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { buildRedirectConfig } from "./src/utils/redirects/index.js";
import { manualChunks, assetFileNames } from "./vite.chunks.js";
import iconGeneratorIntegration from "./src/integrations/icons/icon-generator.integration.mjs";
import clientDirectivesIntegration from "./src/integrations/client-directives/client-directives.integration.mjs";
import conditionalPartytown from "./src/integrations/partytown/partytown.integration.mjs";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");
const redirects = await buildRedirectConfig();
const siteUrl = `https://${env.PUBLIC_SITE_DOMAIN}`;

console.log(`Site URL: ${siteUrl}`);

export default defineConfig({
  site: siteUrl,
  server: { port: 1964 },
  adapter: vercel(),
  output: "static",

  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: 10240, // 10KB - will inline your 7.3KB CSS automatically
      cssCodeSplit: true,
      cssMinify: "esbuild",
      rollupOptions: {
        output: {
          assetFileNames,
          manualChunks,
        },
      },
    },
    css: {
      devSourcemap: false,
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
    },
  },

  integrations: [
    clientDirectivesIntegration(),
    iconGeneratorIntegration(),
    mdx(),
    react({
      include: [
        "**/react/*",
        "**/components/**/*.jsx",
        "**/components/**/*.tsx",
        "**/hooks/**/*.js",
        "**/hooks/**/*.ts",
      ],
    }),
    sitemap(),
    conditionalPartytown(),
  ],

  build: {
    inlineStylesheets: "always",
    split: true,
  },

  prefetch: false,

  compressHTML: true,
  redirects,

  experimental: {
    clientPrerender: false,
  },
});
