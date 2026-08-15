import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'tests/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'html'],
      include: [
        'src/lib/**',
        'src/components/**',
      ],
      exclude: [
        'src/app/**',
        'src/test/**',
        '**/*.d.ts',
        '**/__tests__/**',
        '**/*.stories.*',
      ],
      thresholds: {
        lines:     70,
        functions: 70,
        branches:  65,
      },
    },
  },
})
