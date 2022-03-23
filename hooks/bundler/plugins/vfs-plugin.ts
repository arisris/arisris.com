import type { Plugin } from "esbuild-wasm";
import { createFsFromVolume, Volume } from "memfs";
import path from "path";

export const vfsPlugin = ({
  files
}: {
  files: Record<string, any>;
}): Plugin => {
  const vol = new Volume();
  vol.fromJSON(files);
  const fs = createFsFromVolume(vol);
  const filter = /^(\.\/)|(.\/)/i;
  return {
    name: "vfs-plugin",
    setup(build) {
      build.onResolve({ filter }, async (args) => {
        if (args.namespace === "cdn-url") return;
        return { path: args.path, namespace: "vfs" };
      });
      build.onLoad({ filter, namespace: "vfs" }, async (args) => {
        if (fs.existsSync(args.path)) {
          return {
            contents: fs.readFileSync(args.path, "utf-8"),
            resolveDir: path.dirname(args.path)
          };
        }
      });
    }
  };
};
