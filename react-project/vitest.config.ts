import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    exclude: ['**/node_modules/**', 'src/__tests__/setup.ts'],
    setupFiles: ['./setupTests.js'],
    coverage: {
      include: ['**/*.tsx'],
      exclude: [
        '**/node_modules/**',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        'src/__tests__/setup.ts',
      ],
      reportsDirectory: './coverage',
    },
  },
});
