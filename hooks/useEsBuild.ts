import { useEffect, useState } from "react";
import * as esbuild from "esbuild-wasm";
import { canUseWindow } from "lib/utils";
import dynamic from "next/dynamic";

export default function useEsBuild() {
  const [initialized, setInitialized] = useState(
    // @ts-ignore
    canUseWindow() ? window.__esBuild__ : false
  );
  const [error, setError] = useState<Error>(null);
  useEffect(() => {
    // @ts-ignore
    if (initialized) return;
    esbuild
      .initialize({
        wasmURL: "/esbuild.wasm"
      })
      .then(() => {
        setInitialized(true);
        // @ts-ignore
        window.__esBuild__ = true;
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setInitialized(true);
      });
  }, []);


  
  return { initialized, error, esbuild };
}
