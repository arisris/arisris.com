# Its Just My Personal sites

https://arisris.vercel.app/

I create this project from scratch using starter project https://github.com/arisris/wapblog .

Created by "Jamstack Spirit"
Design to be "Low fat + Fast + SEO Friendly"

## Stack used

- Hosting support
  - vercel
  - ?
- Framework
  - next.js
  - use react on dev
  - use preact on production
  - Tailwind+jit
  - swr
  - more look at package.json
- Database
  - astra datastax

### Features
- Portfolio
- Authentication (wip)
- Simple blog (wip)
- Guestbook (wip)
- ?

If you want to use this project please follow instruction bellow

### Installation

First you should create .env.local file at project root

Create database on astra.datastax.com
Add follwing env variable
``
ASTRA_CLIENT_ID=""
ASTRA_CLIENT_SECRET=""
ASTRA_CLIENT_TOKEN=""
ASTRA_DB_HOST=""
ASTRA_DB_KEYSPACE=""
``

``
$ git clone https://github.com/arisris/arisris.vercel.app
$ yarn install
$ node seed.mjs
``

Develop
``
$ yarn dev
``

Build
``
yarn build
``

--- Documentation? No i'm not ready for this project ---
--- Project is early in development ---

