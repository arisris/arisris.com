---
title: "How to deploy astro site at cloudflare workers"
author: "arisris"
pubDate: "8 Aug 2023 20:58 GMT+7"
isAiGenerated: true
tags: ["tutorial", "how-to-code", "typescript"]
---

Astro is a modern web framework that makes it easy to build static and server-side rendered (SSR) websites. Cloudflare Workers is a serverless platform that allows you to run code close to your users, which can improve performance and reliability.

In this blog post, we will show you how to deploy an Astro site to Cloudflare Workers.

## Prerequisites

Before you get started, you will need the following:

* A Cloudflare account
* A Node.js development environment
* The Astro CLI

## Install the @astrojs/cloudflare adapter

The first step is to install the `@astrojs/cloudflare` adapter. This adapter will allow you to deploy your Astro site to Cloudflare Workers.

You can install the adapter using the following command:

```sh
npm install @astrojs/cloudflare
```

## Configure your Astro project

Once you have installed the adapter, you need to configure your Astro project to use it. To do this, open your `astro.config.mjs` file and add the following code:

```js
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
});
```

This code tells Astro to use the `@astrojs/cloudflare` adapter for server-side rendering.

## Build your Astro site

Now that your Astro project is configured, you can build it. To do this, run the following command:

```sh
npm run build
```

This will create a `dist` folder in your project directory. This folder contains the compiled code for your Astro site.

## Deploy your Astro site to Cloudflare Workers

Finally, you can deploy your Astro site to Cloudflare Workers. To do this, follow these steps:

1. Log in to your Cloudflare dashboard.
2. Click on the **Pages** tab.
3. Click on the **Create Application** button.
4. Select the **Pages** option.
5. Click on the **Connect to Git** button.
6. Select your Astro project from the list of repositories.
7. Click on the **Deploy** button.

Cloudflare will now deploy your Astro site to its servers. This process may take a few minutes.

Once your site has been deployed, you can access it by visiting the URL that Cloudflare provides you.

## Conclusion

In this blog post, we showed you how to deploy an Astro site to Cloudflare Workers. This is a great way to improve the performance and reliability of your Astro site.

I hope this was helpful!