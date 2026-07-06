// Configuration for `@geoql/nuxt-doctor` (https://docs.the-doctor.report).
//
// NOTE: `exclude` REPLACES the built-in default ignore list rather than
// extending it, so the defaults (node_modules, dist, .nuxt, .output, coverage)
// are re-listed here explicitly. Drop any of them and the audit will start
// walking build output.
//
// Authored as a plain default export (no `defineConfig` import) because this
// file is loaded by the `pnpm dlx @geoql/nuxt-doctor` CLI via c12 — the package
// is not a local dependency of `apps/web`, so an import would not resolve in CI.
export default {
  exclude: [
    'node_modules',
    'dist',
    '.nuxt',
    '.output',
    '.agents',
    'coverage',
    // This config file itself: consumed by the nuxt-doctor CLI via c12, never
    // imported by app code, so knip's dead-code pass flags it as unused.
    'doctor.config.ts',
    // Vendored shadcn-vue primitives — generated/owned by the shadcn-vue CLI
    // (`pnpm dlx shadcn-vue add ...`), not hand-authored app code. Excluded so
    // `shadcn-vue add` upgrades stay clean and so their upstream patterns
    // (props destructure in a `computed()`, explicit reka-ui imports) are not
    // counted as our slop.
    'app/components/ui/**',
    // Vitest files run OUTSIDE Nuxt's auto-import context (they stub globals
    // like `ref` themselves), so explicit vue/vitest imports are required there
    // and the no-explicit-imports rule misfires.
    '**/*.test.ts',
  ],
  rules: {
    // knip can't see CLI-invoked binaries: vue-tsc backs `nuxt typecheck` and
    // wrangler backs the deploy step (wrangler deploy --config
    // .output/server/wrangler.json) — both real, neither imported.
    'dead-code/unused-dependency': 'off',
    // Nuxt's generated .nuxt/tsconfig.json already sets `strict: true`; the rule
    // reads the root tsconfig literally and misses the value inherited via
    // `extends`, so it is a false positive here.
    'vue-doctor/build-quality/tsconfig-strict-required': 'off',
  },
};
