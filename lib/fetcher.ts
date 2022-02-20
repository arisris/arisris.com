import { site_url } from "./utils";

export const dataFetching = (path: string, init: RequestInit = {}) => {
  return fetch(site_url(path), {
    ...init,
    headers: {
      "content-type": "application/json",
      ...init.headers
    }
  });
};
