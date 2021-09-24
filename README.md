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
  - detabase
  - _planetscale_

### Features

- Portfolio
- Authentication (github)
- Static blog
- Guestbook (deta base)
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
DETA_PROJECT_KEY=""
```

```sh
$ git clone https://github.com/arisris/arisris.vercel.app.git
$ yarn install
```

Develop

```sh
$ yarn dev
```

Build

```sh
$ yarn build
```

Feel free to contact me if you have a problem.

> Documentation? No i'm not ready for this project
> Project is early in development
