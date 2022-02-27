import { useEffect, useRef, useState } from "react";
// import type only codemirror
import type CodeMirrorTypes from "codemirror";
import { useScriptLoader } from "hooks/useScriptLoader";
import { canUseWindow } from "lib/utils";
export type CodeMirror = typeof CodeMirrorTypes;
declare global {
  interface Window {
    CodeMirror: CodeMirror;
  }
}

export default function useCodeMirror({
  place,
  options
}: {
  place: ParentNode | HTMLElement;
  options: CodeMirrorTypes.EditorConfiguration;
}) {
  const [editor, setEditor] = useState<CodeMirrorTypes.Editor>(null);
  const loader = useScriptLoader({
    id: "codemirror",
    baseUrl: "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/",
    dependencies: [
      {
        type: "js",
        url: "codemirror.min.js"
      },
      {
        type: "js",
        url: "mode/javascript/javascript.min.js"
      },
      {
        type: "js",
        url: "mode/jsx/jsx.min.js"
      },
      {
        type: "css",
        url: "codemirror.min.css"
      },
      {
        type: "css",
        url: "theme/material-palenight.min.css"
      }
    ]
  });
  useEffect(() => {
    if (loader.stylesLoaded && loader.stylesLoaded) {
      if (canUseWindow("CodeMirror")) {
        setEditor(window.CodeMirror(place, options));
        return () => {
          setEditor(null);
          if (place?.replaceChild) place.replaceChildren();
        };
      }
    }
  }, [loader.scriptsLoaded, loader.stylesLoaded, canUseWindow("CodeMirror")]);
  return { editor, loader };
}
