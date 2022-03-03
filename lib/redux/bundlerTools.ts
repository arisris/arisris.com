import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// type only import
import type { ModuleFormat, OutputOptions, Plugin } from "rollup";
import { RootState } from "./store";
import { builtinModules } from "./utils";

type Item = {
  name: string;
  value: string;
};
interface BundlerToolsState {
  status: {
    type: "idle" | "progress" | "success" | "failed";
    message?: string;
  };
  outputFormat: ModuleFormat;
  currentFile: string;
  sources: { [k: string]: string };
  output?: string;
}
const initialState: BundlerToolsState = {
  status: {
    type: "idle",
    message: ""
  },
  outputFormat: "esm",
  currentFile: "main.js",
  sources: {
    "main.js": `import test from "./test.js";\nimport http from "http";\nimport react from "react";\nconsole.log(react);`,
    "test.js": `export default "Hello World";`
  }
};

function rollupResolveModuleFromCDN(): Plugin {
  const cdnUrl = "https://cdn.skypack.dev";
  const makeCDNUrl = (p: string) => {
    return cdnUrl + "/" + p.replace(/^\//, "");
  };
  return {
    name: "http-resolve-plugin",
    async resolveId(id) {
      if (builtinModules.find((i) => id.startsWith(i))) {
        return { id, external: true };
      } else if (!id.startsWith(".")) {
        try {
          const text = await fetch(makeCDNUrl(id)).then((d) => d.text());
          const newId = text.split("⏩ Minified: ")[1].split("\n")[0];
          return { id: newId, external: true };
        } catch (e) {
          console.error("Module not resolved.. " + id);
          return null;
        }
      }
      return null;
    }
  };
}

export const bundleWithRollup = createAsyncThunk<string, OutputOptions>(
  "bundlerTools/bundleWithRollup",
  async (options, thunk) => {
    const { bundlerTools } = thunk.getState() as RootState;
    // import rollup and its plugin dynamically to prevent huge bundle size
    // so they can be spliting into some chunk
    const rollup = await import("rollup").then((i) => i.rollup);
    const virtualFs = await import("rollup-plugin-virtual-fs").then(
      (i) => i.virtualFs
    );
    try {
      const files: BundlerToolsState["sources"] = Object.entries(
        bundlerTools.sources
      ).reduce(
        (a, b) => ((a[b[0].startsWith("/") ? b[0] : "/" + b[0]] = b[1]), a),
        {}
      );
      const bundler = await rollup({
        input: "/main.js",
        plugins: [
          virtualFs({ files, memoryOnly: true }),
          rollupResolveModuleFromCDN()
        ]
      });
      const { output } = await bundler.generate({
        format: bundlerTools.outputFormat,
        ...options
      });
      if (output.length > 0) {
        await bundler.close();
        return output[0].code;
      } else {
        throw new Error("No Output");
      }
    } catch (e) {
      throw e;
    }
  }
);

export const bundlerTools = createSlice({
  name: "bundlerTools",
  initialState,
  reducers: {
    add(state, action: PayloadAction<Item>) {
      state.sources[action.payload.name] = action.payload.value;
      state.currentFile = action.payload.name;
    },
    update(state, action: PayloadAction<string>) {
      state.sources[state.currentFile] = action.payload;
    },
    remove(state, action: PayloadAction<string>) {
      const sources = Object.keys(state.sources);
      let next = sources.indexOf(action.payload);
      if (sources.length > next + 1) {
        next++;
      } else if (sources.length) {
        next--;
      }
      delete state.sources[action.payload];
      state.currentFile = sources[next];
    },
    reset() {
      return initialState;
    },
    bundle(state) {
      // bundleWithRollup(state.sources).then((e) => {
      //   console.log(e);
      // });
    },
    setCurrentFile(state, action: PayloadAction<string>) {
      state.currentFile = action.payload;
    },
    setOutputFormat(state, action: PayloadAction<ModuleFormat>) {
      state.outputFormat = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(bundleWithRollup.fulfilled, (state, action) => {
      state.status.type = "success";
      state.status.message = "Succcessful Bundled";
      state.output = action.payload;
    });
    builder.addCase(bundleWithRollup.rejected, (state, action) => {
      state.status.type = "failed";
      state.status.message = action.error.message;
      state.output = `// ${action.error.message}`;
    });
    builder.addCase(bundleWithRollup.pending, (state, action) => {
      state.status.type = "progress";
      state.status.message = "Bundle on progress...";
      state.output = "";
    });
  }
});
