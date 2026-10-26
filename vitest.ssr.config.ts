import { defineConfig } from 'vitest/config';
import base from './vitest.config';

// Post-build checks against .output/public (`pnpm run test:ssr`, after
// `pnpm run build`). Same aliases as the unit config, separate include.
export default defineConfig({
  resolve: base.resolve,
  test: {
    include: ['tests/ssr/**/*.test.ts'],
    environment: 'node',
  },
});
