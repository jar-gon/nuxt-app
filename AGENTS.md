# AGENTS.md

## Project Facts

- Single-package Nuxt 4 app with `srcDir: 'src/'` and `serverDir: 'src/server'`; do not add Nuxt pages, layouts, components, middleware, or server API under repo-root defaults.
- Use `yarn` only. The repo has `yarn.lock` and a `postinstall` hook that runs `nuxt prepare` and installs Husky hooks; do not use `npm install`.
- Use Node `^22.22.2`, `^24.15.0`, or `>=26.0.0` and Yarn `1.22.22` as declared in `package.json`.
- Nuxt and Nuxt Mongoose resolve Nuxt Kit 4, while `@vant/nuxt` keeps its own Nuxt Kit 3 dependency; do not add a global `@nuxt/kit` resolution.

## Commands

- `yarn install` - install dependencies, run `nuxt prepare`, and install Husky hooks via `postinstall`.
- `yarn dev` - starts `nuxt dev --dotenv .env.development`.
- `yarn build` - runs `nuxt build --dotenv .env.production`.
- `yarn format` / `yarn format:check` - write or check Prettier formatting and Stylelint rules.
- `yarn lint` / `yarn lint:fix` - check or fix ESLint and Stylelint issues; warnings fail the ESLint command.
- `yarn lint:eslint` - run ESLint for JavaScript, TypeScript, and Vue files.
- `yarn lint:style` / `yarn lint:style:fix` - check or fix CSS, Stylus, and Vue style blocks, including property order.
- `yarn typecheck` - prepare Nuxt types and run `vue-tsc` across Nuxt project references.
- `yarn preview` - previews the production build.
- `yarn generate` - runs Nuxt static generation.

## Runtime And Env

- Dev server is `https://b.zmlearn.com:3000`; local hosts must map `b.zmlearn.com`, and cert files are `ssl/server.key` and `ssl/server.pem`.
- `app.baseURL` is `/nuxtApp/`; account for this prefix in links and asset paths.
- `.env`, `.env.development`, and `.env.production` define `NUXT_API_SECRET`, `NUXT_PUBLIC_API_BASE`, and `NUXT_MONGOOSE_URI`.
- Keep real env files and local HTTPS certificate files untracked; use `.env.example` as the committed template.
- `NUXT_PUBLIC_API_BASE` is both `runtimeConfig.public.apiBase` and the Nitro dev proxy target for `/api/zmbiz`.
- `NUXT_MONGOOSE_URI` is required for the menu CRUD server routes backed by `nuxt-mongoose`.

## Architecture Notes

- `src/app.vue` wraps all pages in `NuxtLayout`, `NuxtLoadingIndicator`, and global head metadata from `src/app.config.ts`.
- `/contact` is only a nested route shell; `src/middleware/middleware.global.ts` redirects it to `/contact/home`.
- `src/layouts/default.vue` renders `AppHeader` and `AppFooter`; `src/layouts/custom.vue` is used by the menu pages.
- Business API helpers live in `src/apis/` and are re-exported from `src/composables/apis.ts` for Nuxt auto-import.
- Use `src/composables/useBusinessApi.ts` for imperative business requests; it creates a typed `$fetch` client with credentials and `runtimeConfig.public.apiBase`.
- Use `src/composables/useMenus.ts` for the shared SSR menu list and the menu helpers in `src/apis/menus.ts` for create, update, and delete actions.
- Server menu CRUD lives in `src/server/api/menus/`; `src/server/models/Menus.ts` defines the auto-imported `Menus` mongoose model with required `name` and `path` fields.

## Styling Notes

- Global styles are `src/assets/style/base.css` and `src/assets/style/index.styl`.
- Stylelint parses CSS, standalone Stylus, and Vue style blocks; `stylelint-config-recess-order` enforces and fixes CSS property order.
- ESLint enforces Vue template attribute order and kebab-case component tags, attributes, and event listeners.
- Husky runs lint-staged formatting/lint fixes and the full Nuxt typecheck before each commit.
- `nuxt.config.ts` uses a file-aware `postcss-px-to-viewport-8-plugin` callback: app code under `src/` uses 750px design width, Vant styles use 375px, and other sources are left unchanged.
- Browser targets are iOS 15+ and the latest two Chrome Android versions.
- `nuxt.config.ts` sets `EventEmitter.defaultMaxListeners = 0`; do not remove it without confirming why it was added.
