# AGENTS.md -- vinayakkulkarni.dev

## Project Overview

Personal portfolio for Vinayak Kulkarni -- GIS Engineer and Co-Founder.
Static site with prerendered routes, deployed on Cloudflare Pages.

- **Framework**: Nuxt 4 (compatibility version 4), Vue 3
- **Styling**: Tailwind CSS v4, shadcn-vue (New York style)
- **Maps**: MapLibre GL JS, @geoql/maplibre-gl-starfield
- **Content**: @nuxt/content (Markdown articles)
- **Deployment**: Cloudflare Pages (`cloudflare-pages` nitro preset)
- **Package Manager**: pnpm
- **Linting**: oxlint + oxfmt (NOT eslint, NOT prettier)
- **Releases**: release-please (conventional commits)

## Tech Stack

| Category   | Package                                                                       | Notes                 |
| ---------- | ----------------------------------------------------------------------------- | --------------------- |
| Runtime    | nuxt, vue                                                                     | Latest                |
| Maps       | maplibre-gl, @geoql/maplibre-gl-starfield                                     | Globe + starfield     |
| Styling    | tailwindcss, @tailwindcss/vite                                                | v4, oklch colors      |
| UI         | shadcn-vue components in app/components/ui/                                   | New York variant      |
| Content    | @nuxt/content                                                                 | Articles via Markdown |
| Icons      | @nuxt/icon, @iconify-json/lucide, @iconify-json/carbon, @iconify-json/line-md | SVG mode              |
| Color Mode | @nuxtjs/color-mode                                                            | Dark preference       |
| Fonts      | @nuxt/fonts                                                                   | Inter                 |
| Images     | @nuxt/image                                                                   | Optimization          |
| Animation  | motion-v                                                                      | Vue motion library    |
| Analytics  | @nuxtjs/plausible                                                             | Self-hosted           |
| Utilities  | @vueuse/core, @vueuse/nuxt, clsx, tailwind-merge                              | Composables + cn()    |
| Dev        | oxlint, oxfmt, typescript                                                     | Linting + formatting  |

## Critical Rules

### Code Style

- TypeScript strict mode, `<script setup lang="ts">` for all components
- oxlint for linting, oxfmt for formatting -- never eslint or prettier
- pnpm as package manager -- never npm, bun, or yarn
- No `as any`, `@ts-ignore`, `@ts-expect-error` -- fix the types properly
- No empty catch blocks `catch(e) {}`
- No console.log in production code
- Prefer `const` over `let`, never `var`

### Tailwind CSS v4

- All colors use oklch values (defined in globals.css)
- Dark mode via custom variant: `@custom-variant dark (&:where(.dark, .dark *))`
- Use the `cn()` utility (tailwind-merge + clsx) for conditional classes
- Theme tokens defined as CSS custom properties in `:root` and `.dark`
- Use `@theme inline` block for Tailwind token mapping

### shadcn-vue

- Components live in `app/components/ui/`
- New York style variant
- Registered with `pathPrefix: false` in nuxt.config.ts
- When adding new components: `pnpm dlx shadcn-vue@latest add <component>`
- Follow existing component patterns -- do not modify generated ui components

### MapLibre GL JS

- Use `maplibre-gl` directly -- do NOT use `@geoql/v-maplibre` npm package (published version lacks required exports and causes crashes)
- `@geoql/maplibre-gl-starfield` for globe starfield + sun rendering
- Map components MUST be wrapped in `<ClientOnly>` -- MapLibre requires browser APIs
- Use the dual init pattern for maps inside ClientOnly:
  ```
  watch(mapContainer, (el) => { if (el) initMap(el) })
  onMounted(() => { if (mapContainer.value) initMap(mapContainer.value) })
  ```
- Store map instance in `shallowRef` (not `ref`) to avoid deep reactivity on the map object
- Always call `map.remove()` in `onBeforeUnmount`

### Nuxt Conventions

These rules are enforced. See `.agents/skills/nuxt-best-practices/` for detailed examples.

| Rule                                | Summary                                                          |
| ----------------------------------- | ---------------------------------------------------------------- |
| `data-use-fetch`                    | Use useFetch/useAsyncData, never raw fetch in components         |
| `data-key-unique`                   | Always provide unique keys for data fetching                     |
| `data-transform`                    | Transform data at fetch time, not in template                    |
| `data-error-handling`               | Always handle error and pending states                           |
| `imports-no-barrel-autoimport`      | Never create barrel exports in auto-imported directories         |
| `imports-component-naming`          | Do not duplicate folder prefix in component filenames            |
| `imports-type-locations`            | Place types in dedicated directories (app/types/, shared/types/) |
| `imports-composable-exports`        | Composables export functions only, not types                     |
| `imports-direct-composable-imports` | Use direct imports between composables, not auto-import          |
| `server-runtime-config`             | Use useRuntimeConfig, never process.env                          |
| `server-error-handling`             | Use createError for consistent error responses                   |
| `rendering-client-only`             | Use ClientOnly for browser-specific components                   |
| `rendering-prerender`               | Prerender static pages at build time                             |
| `state-use-state`                   | Use useState for SSR-safe shared state                           |
| `types-no-inline`                   | Never define types inline in components                          |
| `types-no-any`                      | Never use any type                                               |

### Vue Conventions

These rules are enforced. See `.agents/skills/vue-best-practices/` for detailed examples.

| Rule                               | Summary                                            |
| ---------------------------------- | -------------------------------------------------- |
| `reactivity-ref-vs-reactive`       | ref() for primitives, reactive() for objects       |
| `reactivity-avoid-destructure`     | Do not destructure reactive objects                |
| `reactivity-toRefs`                | Use toRefs() when destructuring is needed          |
| `reactivity-shallowRef`            | Use shallowRef() for large non-reactive data       |
| `reactivity-raw-values`            | Use toRaw() for read-only operations on large data |
| `component-v-once`                 | Use v-once for static content                      |
| `component-v-memo`                 | Use v-memo for expensive list items                |
| `component-async`                  | Use defineAsyncComponent for heavy components      |
| `computed-cache`                   | Use computed() for derived values, not methods     |
| `computed-dependencies`            | Minimize computed dependencies                     |
| `template-v-show-vs-if`            | v-show for frequent toggles, v-if for rare         |
| `template-key-attribute`           | Always use unique keys in v-for                    |
| `template-avoid-v-if-v-for`        | Never use v-if and v-for on same element           |
| `composable-single-responsibility` | One concern per composable                         |
| `composable-return-refs`           | Return refs from composables, not reactive objects |
| `composable-cleanup`               | Handle cleanup in composables                      |
| `watch-deep-avoid`                 | Avoid deep watchers on large objects               |

### Icon Conventions

- Icon mode is `svg` (not CSS mask -- mask mode renders broken glyphs)
- Custom icon collection `base` registered from `app/assets/icons/`
- Usage: `<Icon name="base:v-logo" class="size-8" mode="svg" />`
- Lucide as primary icon set: `<Icon name="lucide:icon-name" />`

## UX Principles -- Laws of UX

| Law                          | Description                                                           |
| ---------------------------- | --------------------------------------------------------------------- |
| Aesthetic-Usability Effect   | Users perceive aesthetically pleasing design as more usable           |
| Doherty Threshold            | Productivity soars when response time is under 400ms                  |
| Fitts's Law                  | Time to reach a target is proportional to distance, inversely to size |
| Goal-Gradient Effect         | Motivation increases as users approach a goal                         |
| Hick's Law                   | Decision time increases with number and complexity of choices         |
| Jakob's Law                  | Users prefer sites that work like other sites they already know       |
| Law of Common Region         | Elements within a shared area are perceived as grouped                |
| Law of Proximity             | Objects near each other are perceived as grouped                      |
| Law of Pragnanz              | People perceive complex shapes in the simplest form possible          |
| Law of Similarity            | Similar elements are perceived as more related                        |
| Law of Uniform Connectedness | Connected elements are perceived as a single group                    |
| Miller's Law                 | Average person can hold 7 (plus or minus 2) items in working memory   |
| Occam's Razor                | The simplest solution is usually the best                             |
| Pareto Principle             | 80% of effects come from 20% of causes                                |
| Parkinson's Law              | Work expands to fill the time available                               |
| Peak-End Rule                | Experience is judged by its peak and end moments                      |
| Postel's Law                 | Be liberal in what you accept, conservative in what you send          |
| Serial Position Effect       | First and last items in a series are remembered best                  |
| Tesler's Law                 | Every system has inherent complexity that cannot be reduced           |
| Von Restorff Effect          | Items that stand out are more likely to be remembered                 |
| Zeigarnik Effect             | People remember uncompleted tasks better than completed ones          |
| Cognitive Load               | Reduce total cognitive effort required for learning tasks             |
| Principle of Least Surprise  | Design should match user expectations                                 |
| Progressive Disclosure       | Show only essential information, reveal more as needed                |
| Recognition Over Recall      | Show options rather than requiring memory                             |
| Feedback Principle           | Every action should produce visible, immediate feedback               |
| Consistency Principle        | Similar elements should have similar behavior                         |
| Error Prevention             | Design to prevent errors rather than fix them                         |
| Flexibility-Efficiency       | Provide shortcuts for experienced users                               |
| Gestalt Closure              | The brain completes incomplete shapes and patterns                    |

## 12-Factor Principles (Applicable)

| Factor                 | Application                                                    |
| ---------------------- | -------------------------------------------------------------- |
| I. Codebase            | One repo (vinayakkulkarni.dev), deployed to Cloudflare Pages   |
| II. Dependencies       | Explicitly declared in package.json, locked via pnpm-lock.yaml |
| III. Config            | Environment variables via useRuntimeConfig, never process.env  |
| V. Build, Release, Run | nuxt build produces static output, deployed separately         |
| X. Dev/Prod Parity     | Same Nuxt build, same nitro preset in dev and CI               |
| XI. Logs               | Plausible analytics as event streams, structured server logs   |
| XII. Admin Processes   | One-off tasks via pnpm scripts                                 |

## Project Structure

```
vinayakkulkarni.dev/
  .agents/skills/              # Installed AI skills (vue/nuxt best practices)
  .github/workflows/           # CI/CD pipelines
  app/
    assets/
      css/globals.css          # Tailwind v4 theme, oklch tokens
      icons/                   # Custom SVG icons (v-logo.svg)
    components/
      ui/                      # shadcn-vue components (no pathPrefix)
      HeroSection.vue          # MapLibre globe + starfield
      SiteHeader.vue           # Navigation + color mode toggle
      SiteFooter.vue           # Footer with social links
      AboutSection.vue
      ProjectsSection.vue
      OpenSourceSection.vue
      ArticlesSection.vue
    layouts/
      default.vue              # SiteHeader + slot + SiteFooter
    pages/
      index.vue                # Homepage with globe hero + teaser cards
      about.vue
      projects.vue
      open-source.vue
      articles/
        index.vue
        [...slug].vue          # Dynamic article pages
    app.vue                    # NuxtLayout + NuxtPage
  content/
    articles/                  # Markdown articles
  public/
    favicon.svg                # Potrace V. logo
    milkyway.jpg               # Starfield galaxy texture
  nuxt.config.ts
  package.json
  components.json              # shadcn-vue config
  content.config.ts            # Content collection schema
  release-please-config.json
  .release-please-manifest.json
  .oxlintrc.jsonc
  .oxfmtrc.jsonc
```

## CI/CD

### Pipeline (pipeline.yml)

Push to `main` or PR triggers: extract-branch -> CI -> CD (main only).

### Continuous Integration (ci.yml)

1. Checkout
2. Setup Node.js 24 + pnpm
3. Cache pnpm store
4. `pnpm install --frozen-lockfile`
5. `pnpm run lint` (oxlint)
6. `pnpm run fmt:check` (oxfmt)
7. `pnpm run build` (nuxt build)

### Continuous Deployment (cd.yml)

1. Same setup as CI
2. `pnpm run build` with `NITRO_PRESET=cloudflare-pages`
3. Deploy via `cloudflare/wrangler-action@v3` to Cloudflare Pages

### Releases (release-please.yml)

- Runs on push to main
- Uses conventional commits to auto-generate changelogs
- Creates release PRs with version bumps

## Performance

- Prerender all static routes in nitro config (`crawlLinks: true`)
- Use `defineAsyncComponent` for heavy components not needed at initial load
- Wrap browser-only components in `<ClientOnly>` with fallback slots
- Use `shallowRef` for MapLibre map instances and large data structures
- Use `v-once` for static content that never changes
- Use `v-memo` for expensive list item rendering
- Use `computed()` for derived values (cached), not methods (recalculated every render)
- Image optimization via `@nuxt/image`
- Font loading via `@nuxt/fonts` (Inter, optimized subsetting)

## Accessibility

- Semantic HTML elements (`nav`, `main`, `section`, `article`, `header`, `footer`)
- ARIA labels on all interactive elements (buttons, toggles, links)
- Keyboard navigation support for all interactive components
- Color contrast maintained through oklch color system
- `lang="en"` on html element
- Descriptive link text (not "click here")
- Focus indicators preserved (do not remove outline styles)
- `alt` attributes on all images
