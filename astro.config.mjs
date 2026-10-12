import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  site: 'https://samsungrefrigerator.repair',
  output: 'static',
  trailingSlash: 'always',
  fonts: [
    { provider: fontProviders.google(), name: 'Inter', cssVariable: '--font-body', weights: ['400', '600', '800'], styles: ['normal'], subsets: ['latin'], fallbacks: ['system-ui', 'Arial', 'sans-serif'], display: 'swap' },
    { provider: fontProviders.google(), name: 'IBM Plex Mono', cssVariable: '--font-mono', weights: ['400', '600'], styles: ['normal'], subsets: ['latin'], fallbacks: ['ui-monospace', 'Menlo', 'Consolas', 'monospace'], display: 'swap' },
  ],
});
