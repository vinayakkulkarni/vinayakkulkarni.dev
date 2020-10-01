---
title: 'Bundle Vue 3 Apps with Rollup.js'
description: "Let's bundle a brand new vue 3 app with rollup"
position: 1
category: 'vue'
status: 'draft'
tags: ['vue 3', 'rollup']
---

_Vue 3_

Vue 3 got released few days ago & it's about time you found a full-proof guide for packaging & publishing your awesome components on npm for folks to use. <span class="blinking-heart">❤️</span> OSS

Bundling Vue 2 apps was easy, well, bundling Vue 3 apps is easier!

_Getting Started_

```bash
$ mkdir my-awesome-component
$ cd my-awesome-component
$ npm init
```


_Dependencies_
- [Vue (^3.0.0)](https://v3.vuejs.org/guide/introduction.html) - Le framework!
- [Rollup (^2.28.2)](https://rollupjs.org/) - Our super-duper bundler
- [rollup-plugin-vue (^6.0.0-alpha.2)](https://github.com/vuejs/rollup-plugin-vue) - Required for bundling the Vue SFCs
- [@vue/compiler-sfc (^3.0.0)](https://www.npmjs.com/package/@vue/compiler-sfc) - Required for compiling the Vue SFCs

Install these dependencies

```bash
$ npm i -D rollup rollup-plugin-vue @vue/compiler-sfc
$ npm i vue
```