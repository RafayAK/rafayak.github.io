// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// ───────────────────────────────────────────────────────────────────────────
// Deployment note (see AGENTS.md):
// This repo is currently named `rafayak.github.com`, which makes it a GitHub
// *project* page served at  https://rafayak.github.io/rafayak.github.com/
// RECOMMENDED: rename the repo to `rafayak.github.io` for a clean root URL,
// then keep `base: '/'`.
// If you keep the current name, set `base: '/rafayak.github.com'`.
// All internal links use the `href()` helper in src/lib/utils.ts, so flipping
// `base` here is the only change needed.
// ───────────────────────────────────────────────────────────────────────────
export default defineConfig({
  site: 'https://rafayak.github.io',
  base: '/',
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
