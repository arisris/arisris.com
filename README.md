# Its Just My Personal sites

https://arisris.vercel.app/

A Next.js based blog and portfolio website
Created by "Jamstack Spirit"
Design to be "Low fat + Fast + SEO Friendly"

## Stack used

- Hosting support
  - vercel.com
  - ?
- Framework
  - Next.js (react@dev preact@production)
  - Tailwind+jit
  - storeon (state management)
  - more look at package.json
- Database
  - upstash
  - planetscale

### Features

- Portfolio
- Authentication (github)
- MySQL based blog (wip)
- Guestbook (upstash.com)
- ?

If you want to use this project please follow instruction bellow

### Installation

First you should create .env.local file at project root

Add follwing env variable

```env
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
APP_SECRET_KEY=""
UPSTASH_REST_TOKEN=""
UPSTASH_REST_URL=""
MYSQL_URL=""
```

```sh
$ git clone https://github.com/arisris/arisris.vercel.app
$ yarn install $ node seed.mjs
```

Develop

```sh
$ yarn dev
```

Build

```sh
$ yarn build
```

--- Documentation? No i'm not ready for this project ---
--- Project is early in development ---
