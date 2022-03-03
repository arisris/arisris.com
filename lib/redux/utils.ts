import {
  BaseQueryFn,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from "@reduxjs/toolkit/dist/query";

export const graphqlBaseQuery: BaseQueryFn<
  { query?: string; variables?: any },
  any,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  const baseResult = await fetchBaseQuery()(
    {
      url: "/api/graphql",
      method: "POST",
      body: args,
      headers: {
        "content-type": "application/json"
      }
    },
    api,
    extraOptions
  );
  return baseResult;
};

export const builtinModules = [
  "assert",
  "async_hooks",
  "buffer",
  "child_process",
  "cluster",
  "console",
  "constants",
  "crypto",
  "dgram",
  "dns",
  "domain",
  "events",
  "fs",
  "http",
  "http2",
  "https",
  "inspector",
  "module",
  "net",
  "os",
  "path",
  "perf_hooks",
  "process",
  "punycode",
  "querystring",
  "readline",
  "repl",
  "stream",
  "string_decoder",
  "timers",
  "tls",
  "trace_events",
  "tty",
  "url",
  "util",
  "v8",
  "vm",
  "wasi",
  "worker_threads",
  "zlib",
]