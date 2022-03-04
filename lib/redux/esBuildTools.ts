import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Format } from "esbuild-wasm";

type Item = {
  name: string;
  value: string;
};
interface EsBuildToolsState {
  status: {
    type: "idle" | "progress" | "success" | "failed";
    message?: string;
  };
  outputFormat: Format;
  currentFile: string;
  sources: { [k: string]: string };
  output?: string;
}
const initialState: EsBuildToolsState = {
  status: {
    type: "idle",
    message: ""
  },
  outputFormat: "esm",
  currentFile: "./main.js",
  sources: {
    "./main.js": `// this is virtual module vfs\nimport test from "./test.js";\n// this is biltin module\nimport http from "http";\n// this is remote module taken from cdn\nimport mitt from "mitt";\nconsole.log(mitt);\nconsole.log(test)`,
    "./test.js": `export default "Hello World";`
  },
  output: ""
};

export const esBuildTools = createSlice({
  name: "esbuildTools",
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
    setCurrentFile(state, action: PayloadAction<string>) {
      state.currentFile = action.payload;
    },
    setOutputFormat(
      state,
      action: PayloadAction<EsBuildToolsState["outputFormat"]>
    ) {
      state.outputFormat = action.payload;
    },
    setStatus(state, action: PayloadAction<EsBuildToolsState["status"]>) {
      state.status = action.payload;
    },
    resetStatus(state) {
      state.status = initialState.status;
    },
    setOutput(state, action: PayloadAction<EsBuildToolsState["output"]>) {
      state.output = action.payload;
    },
    resetOutput(state) {
      state.output = initialState.output;
    }
  }
});
