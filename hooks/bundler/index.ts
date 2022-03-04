import { initialize, build, Plugin, Format } from "esbuild-wasm";
import { fetchPlugin, fileCache } from "./plugins/fetch-plugin";
import { useEffect, useState } from "react";
import { canUseWindow } from "lib/utils";
import { vfsPlugin } from "./plugins/vfs-plugin";

type BuildOptionsExt = Partial<{
  define: Record<string, any>;
  jsxFactory: string;
  jsxFragment: string;
  plugins: Plugin[];
  minify?: boolean;
  treeShaking?: boolean;
  format?: Format;
}>;
export function useEsBuild(customWasmURL?: string) {
  const [initialized, setInitialized] = useState(false);
  const initializeEsBuild = () => {
    if (initialized) return;
    try {
      initialize({
        wasmURL: customWasmURL || "/esbuild.wasm"
      }).then(() => {
        setInitialized(true);
      });
    } catch (e) {
      // sometime error if hot reload triggered but no problem
      console.log(e.message);
      setInitialized(true);
    }
  };
  useEffect(() => initializeEsBuild(), []);
  const createBundle = async ({
    files,
    main,
    options
  }: {
    files?: Record<string, string>;
    main?: string;
    options?: BuildOptionsExt;
  }): Promise<{ code: string; err: string }> => {
    if (!canUseWindow())
      throw new Error(
        "Build only works on browser. cannot used in server runtime eg: Node"
      );
    if (!initialized) throw new Error("Esbuild Is Not Initialized");
    if (!files)
      files = {
        "./main.js": `console.log("Hello World: This is Example");`
      };
    if (!main) main = "./main.js";
    if (!options) options = {};
    try {
      const result = await build({
        entryPoints: [main || "./main.js"],
        watch: false,
        bundle: true,
        write: false,
        format: options.format || "esm",
        treeShaking: options.treeShaking || false,
        minify: options.minify || false,
        plugins: [
          vfsPlugin({ files }),
          fetchPlugin(),
          ...(options.plugins || [])
        ],
        define: {
          "process.env.NODE_ENV": '"production"',
          global: "window",
          ...(options.define || {})
        },
        jsxFactory: options.jsxFactory || "_React.createElement",
        jsxFragment: options.jsxFragment || "_React.Fragment"
      });

      return {
        code: result.outputFiles[0].text,
        err: ""
      };
    } catch (err) {
      return {
        code: "",
        err: err.message
      };
    }
  };
  return {
    createBundle,
    supported: canUseWindow("WebAssembly"),
    ready: initialized,
    clearCache: async () => fileCache.clear()
  };
}
