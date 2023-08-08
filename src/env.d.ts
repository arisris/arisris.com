/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client-image" />

interface ImportMetaEnv {
  readonly APP_KEY: string;
  readonly GITHUB_EMAIL: string;
  readonly GITHUB_PERSONAL_ACCESS_TOKEN: string;
  readonly GITHUB_CLIENT_SECRET: string;
  readonly GITHUB_CLIENT_ID: string;
  readonly DETA_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
