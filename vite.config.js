import { defineConfig } from 'vite';
import { sync } from 'glob';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      input: sync('./src/**/*.html'.replace(/\\/g, '/')),
      output: [
        {
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.').at(1);
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'img';
            } else if (/ttf|woff/i.test(extType)) {
              extType = 'fonts';
            }
            return `assets/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      ],
    },
  },
  plugins: [],
});
