import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    // ES2022 — matches tsconfig and supports the top-level await used by the
    // lazy i18n loader; covered by all evergreen browsers.
    target: 'es2022',
    cssMinify: true,
    sourcemap: false,
    // Warn later than default so intentionally-large lazy chunks stay quiet.
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // Split heavy third-party libraries into their own long-cached chunks
        // so app-code changes don't bust the vendor cache. (Rolldown wants a
        // function, not the object map Rollup used to accept.)
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) {
            return 'react-vendor'
          }
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) {
            return 'motion-vendor'
          }
        },
      },
    },
  },
})
