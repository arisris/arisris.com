import {
  createScriptLoader,
  createStylesheetLoader
} from "@bigcommerce/script-loader";
import { useSet } from "ahooks";
import { useEffect, useState } from "react";

type DepType = {
  type: "js" | "css";
  url: string;
};
type ScriptLoaderProps = {
  id: string;
  baseUrl?: string;
  dependencies?: DepType[];
};

export const useScriptLoader = ({
  id,
  dependencies = [],
  baseUrl = ""
}: ScriptLoaderProps) => {
  const scriptLoader = createScriptLoader();
  const styleSheetLoader = createStylesheetLoader();
  const [set, dep] = useSet<DepType>(dependencies);
  const [state, setState] = useState([false, false]);
  const data: DepType[] = Array.from(set);
  const addScript = (url: string) => dep.add({ type: "js", url });
  const addStyle = (url: string) => dep.add({ type: "css", url });
  const removeScript = (url: string) => dep.remove({ type: "js", url });
  const removeStyle = (url: string) => dep.remove({ type: "css", url });
  const resetState = () => setState([false, false]);
  const byType = (t: DepType["type"]) =>
    data
      .filter((a) => a?.url && a?.type === t)
      .map((i) => `${baseUrl}${i.url}`);

  useEffect(() => {
    resetState();
    scriptLoader
      .loadScripts(byType("js"), {
        attributes: { id: id + "-js" },
        async: false
      })
      .then(() => {
        setState((a) => [true, a[1]]);
      });
    styleSheetLoader
      .loadStylesheets(byType("css"), {
        attributes: { id: id + "-css" },
        prepend: false
      })
      .then(() => {
        setState((a) => [a[0], true]);
      });
    return () => {
      // unsubscribe script
      document
        .querySelectorAll(`link#${id}-css[rel=stylesheet]`)
        .forEach((s) => {
          byType("css").forEach((u) => {
            if (s.getAttribute("href").includes(u)) {
              s.remove();
            }
          });
        });
      document.querySelectorAll(`script#${id}-js`).forEach((s) => {
        byType("js").forEach((u) => {
          if (s.getAttribute("src").includes(u)) {
            s.remove();
          }
        });
      });
      resetState();
    };
  }, [set]);

  return {
    data,
    addScript,
    removeScript,
    addStyle,
    removeStyle,
    scriptsLoaded: state[0],
    stylesLoaded: state[1]
  };
};
