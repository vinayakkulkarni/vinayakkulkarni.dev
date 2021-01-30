---
title: "Transition your release process from manual to automated"
description: "Make use of ship.js to ease the pain of manual release & changelog generation"
position: 5
category: 'release'
status: 'draft'
tags: ['automation', 'github registry']
---

Publishing & Releasing newer versions of your awesome node apps can be a pain if you're doing it manually by per commit basis.

I'd like to shed some light on publishing apps using release & changelog automation tool created by Aloglia called as - [ship.js ⛴](https://github.com/algolia/shipjs)

As per the docs:

### Features
- Automated - Minimize your effort for release and make less mistakes.
- Asynchronous - You don't have to release on your local machine. Do it asynchronously and continue your work.
- Collaborative - Don't sweat it alone. Review the next release on pull request with your colleagues.

So, let's begin...

As before, I'll be using the [v-pip](https://github.com/vinayakkulkarni/v-pip) as a demo project to guide you.

### Step #1

Install ship.js

```bash
npx shipjs setup
```

These are the basically the steps I follow while setting up ship.js

```bash
$ npx shipjs setup                                                                                                                                                                                                                                                 [20:20:08]
npx: installed 362 in 15.882s
? What is your base branch?
  This is also called "Default branch".
  You usually merge pull-requests into this branch. main
? Which CI configure? GitHub Actions
? Add manual prepare with issue comment?
  You can create `@shipjs prepare` comment on any issue and then github actions run `shipjs prepare` No
? Schedule your release? No
› Installing Ship.js
› Adding scripts to package.json
› Creating ship.config.js
› Creating GitHub Actions configuration

🎉  FINISHED

✔ Installed shipjs as devDependency.

✔ Added `release` in `scripts` section of `package.json`.

✔ No `ship.config.js` required.
  You can learn more about the configuration.
  > https://community.algolia.com/shipjs/guide/useful-config.html

✘ `.github/workflows/shipjs-trigger.yml` already exists.
  You still need to finish setting up GitHub Actions.
  > https://community.algolia.com/shipjs/guide/getting-started.html#setup-github-actions

To learn more, visit https://community.algolia.com/shipjs/guide/getting-started.html
```

### Step #2

Modifying the default `.github/workflows/shipjs-trigger.yml` file.

```yml

name: Ship js trigger
on:
  pull_request:
    types:
      - closed
jobs:
  build:
    name: Release
    runs-on: ubuntu-latest
    if: github.event.pull_request.merged == true && startsWith(github.head_ref, 'releases/v')
    steps:
      - name: Checkout 🛎
        uses: actions/checkout@v2
        with:
          fetch-depth: 0
          ref: main

      - name: Setup node environment 📦
        uses: actions/setup-node@v2.1.4
        with:
          registry-url: "https://registry.npmjs.org"

      - name: Install dependencies 🛠
        run: npm ci

      - name: Trigger new release 🎉
        run: npx shipjs trigger
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_AUTH_TOKEN: ${{ secrets.NPM_AUTH_TOKEN }}
          SLACK_INCOMING_HOOK: ${{ secrets.SLACK_INCOMING_HOOK }}
```
