import * as esbuild from "esbuild-wasm";
import localForage from "localforage";
import path from "path";

export const fileCache = localForage.createInstance({
  name: "esbuild-resolved-modules"
});
const builtinModules = [
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
  "zlib"
];
const cdnUrl = "https://cdn.skypack.dev";
const makeResolveDir = (url: string) =>
  path.normalize(new URL(`./`, `${url}`).pathname);

export const fetchPlugin = () => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, (args) => {
        if (builtinModules.findIndex((i) => i === args.path) === -1) {
          return {
            namespace: "cdn-url",
            path: `${cdnUrl}${path.normalize(`/${args.path}`)}`
          };
        }
        return {
          external: true,
          path: args.path,
          namespace: "builtin-modules"
        };
      });
      build.onLoad({ filter: /.*/, namespace: "cdn-url" }, async (args) => {
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (cachedResult) return cachedResult;
      });

      // build.onLoad({ filter: /.css$/, namespace: "cdn-url" }, async (args) => {
      //   const fetcher = await fetch(args.path);
      //   const text = await fetcher.text();
      //   const escaped = text
      //     .replace(/\n/g, "")
      //     .replace(/"/g, '\\"')
      //     .replace(/'/g, "\\'");
      //   const contents = `
      //     const style = document.createElement('style');
      //     style.innerText = '${escaped}';
      //     document.head.appendChild(style);
      //   `;
      //   const result: esbuild.OnLoadResult = {
      //     loader: "jsx",
      //     contents,
      //     resolveDir: makeResolveDir(fetcher.url)
      //   };
      //   await fileCache.setItem(args.path, result);
      //   return result;
      // });

      build.onLoad({ filter: /.*/, namespace: "cdn-url" }, async (args) => {
        const fetcher = await fetch(args.path);
        let contents = await fetcher.text();
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: makeResolveDir(fetcher.url)
        };
        await fileCache.setItem(args.path, result);
        return result;
      });
    }
  };
};
