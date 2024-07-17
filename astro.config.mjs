import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    site: 'https://santilopezpavon.github.io',
    base: 'miweb',
    integrations: [tailwind()],
});
