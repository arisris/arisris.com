import type { Editor } from "codemirror";
import useCodeMirror from "hooks/useCodeMirror";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

interface Props {
  value: string;
  name: string;
  readonly?: boolean;
  onChange?: (code: string) => void;
}

export function CodeEditor(props: Props) {
  const { resolvedTheme } = useTheme();
  const el = useRef<HTMLDivElement>(null);
  const { editor: cm, loadMode } = useCodeMirror(el.current);

  useEffect(() => {
    if (!cm) return;
    if (resolvedTheme === "dark") {
      cm.setOption("theme", "dracula");
    } else {
      cm.setOption("theme", "default");
    }
  }, [resolvedTheme, cm]);
  const handleEditorChange = (e: Editor) => {
    if (typeof props.onChange === "function") props.onChange(e.getValue());
  };
  useEffect(() => {
    if (!cm) return;
    if (!cm.getMode().name || cm.getMode().name === "null")
      loadMode(props.name);
    if (cm.getValue() !== props.value) cm.setValue(props.value || "");
    cm.on("change", handleEditorChange);
    return () => {
      cm.off("change", handleEditorChange);
      cm.setValue("");
    };
  }, [cm, props.value]);

  useEffect(() => {
    if (!cm) return;
    loadMode(props.name);
  }, [props.name]);

  return (
    <>
      {!cm && <div>Initialize Editor</div>}
      <div id="code-editor-wrapper" ref={el} />
    </>
  );
}
