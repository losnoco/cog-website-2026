import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: "https://cog.losno.co",
  vite: {
    plugins: [tailwindcss()],
  },
});
