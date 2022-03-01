import { useEffect, useState } from "react";
// import type only codemirror
import type CodeMirror from "codemirror";
import {
  useScriptLoader,
  UseScriptLoaderDependencies
} from "hooks/useScriptLoader";
import { canUseWindow } from "lib/utils";
declare global {
  interface Window {
    CodeMirror: typeof CodeMirror;
  }
}

const dependencies: UseScriptLoaderDependencies[] = [
  {
    type: "js",
    url: "codemirror.min.js"
  },
  {
    type: "js",
    url: "mode/meta.min.js"
  },
  {
    type: "js",
    url: "addon/mode/loadmode.min.js"
  },
  {
    type: "js",
    url: "addon/edit/closebrackets.min.js"
  },
  {
    type: "js",
    url: "addon/selection/active-line.min.js"
  },
  {
    type: "css",
    url: "codemirror.min.css"
  },
  {
    type: "css",
    url: "theme/material-palenight.min.css"
  }
];
const scriptCfg = {
  id: "codemirror",
  baseUrl: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/",
  dependencies
};
export default function useCodeMirror(
  el: HTMLElement,
  defaultConfig: CodeMirror.EditorConfiguration = {}
) {
  const { scriptsLoaded, stylesLoaded, addScript, addStyle } =
    useScriptLoader(scriptCfg);
  const [editor, setEditor] = useState<CodeMirror.Editor>(null);
  const inititalizer = () => {
    if (stylesLoaded && stylesLoaded) {
      if (canUseWindow("CodeMirror")) {
        const CodeMirror = window.CodeMirror;
        setEditor(
          CodeMirror(el, {
            // @ts-ignore
            autoCloseBrackets: true,
            styleActiveLine: true,
            autocorrect: true,
            tabSize: 2,
            indentWithTabs: false,
            smartIndent: true,
            theme: "default",
            lineNumbers: true,
            ...defaultConfig
          })
        );
        return () => {
          setEditor(null);
          if (el?.replaceChild) el.replaceChildren();
        };
      }
    }
  };
  useEffect(inititalizer, [
    scriptsLoaded,
    stylesLoaded,
    canUseWindow("CodeMirror")
  ]);
  const loadMode = (filename: string) => {
    if (!editor) return;
    const CodeMirror = window.CodeMirror;
    // @ts-ignore
    window.CodeMirror.modeURL = scriptCfg.baseUrl + "mode/%N/%N.min.js";
    var val = filename,
      m: any[],
      mode: string,
      spec: string | CodeMirror.ModeSpec<CodeMirror.ModeSpecOptions>;
    if ((m = /.+\.([^.]+)$/.exec(val))) {
      // @ts-ignore
      var info = CodeMirror.findModeByExtension(m[1]);
      if (info) {
        mode = info.mode;
        spec = info.mime;
      }
    } else if (/\//.test(val)) {
      // @ts-ignore
      var info = CodeMirror.findModeByMIME(val);
      if (info) {
        mode = info.mode;
        spec = val;
      }
    }
    // else {
    //   mode = spec = val;
    // }
    if (mode) {
      if (mode !== editor.getMode()?.name) {
        editor.setOption("mode", spec);
        // @ts-ignore
        CodeMirror.autoLoadMode(editor, mode);
      }
      //console.log(mode, spec);
    } else {
      if (!!filename) alert("Could not find a mode corresponding to " + val);
      editor.setOption("mode", "null");
    }
  };
  return { editor, loadMode };
}
