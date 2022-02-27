import { Tab } from "@headlessui/react";
import { useMap } from "ahooks";
import clsx from "clsx";
import type { Editor } from "codemirror";
import useCodeMirror from "hooks/useCodeMirror";
import { useTheme } from "next-themes";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";

export type CodeEditorFileItem = {
  content: string;
};
export type CodeEditorFiles = Map<string, CodeEditorFileItem>;

export type CodeEditorProps = {
  onFileChange?: (name: string, value: string) => void;
  onFileClose?: (name: string) => void;
  defaultFile?: string;
  filesMap: CodeEditorFiles;
};

export function CodeEditor({
  filesMap,
  defaultFile,
  onFileChange,
  onFileClose
}: CodeEditorProps) {
  const theme = useTheme();
  const [activeFile, setActiveFile] = useState<
    [string, CodeEditorFileItem] | null
  >(
    filesMap.has(defaultFile) ? [defaultFile, filesMap.get(defaultFile)] : null
  );
  const getActiveFile = () => {
    if (!activeFile) return null;
    return { name: activeFile[0], file: activeFile[1] };
  };
  const editorRef = useRef<HTMLDivElement>();
  const { editor } = useCodeMirror({
    place: editorRef.current,
    options: {
      value: getActiveFile()?.file?.content || "",
      mode: {
        name: "javascript",
        json: true,
        jsonld: true,
        typescript: true
      },
      autocorrect: true,
      tabSize: 2,
      indentWithTabs: false,
      smartIndent: true,
      theme: "default",
      lineNumbers: true
    }
  });
  const handleEditor = () => {
    if (theme?.resolvedTheme === "dark") {
      editor.setOption("theme", "material-palenight");
    } else {
      editor.setOption("theme", "default");
    }
  };
  useEffect(() => {
    if (editor) {
      handleEditor();
      editor.setSize("100%", "200px");
    }
  }, [editor, theme?.resolvedTheme]);
  const handleEditorChange = (e: Editor) => {
    if (!activeFile) return;
    if (typeof onFileChange === "function") {
      onFileChange(getActiveFile()?.name, e.getValue());
    }
  };
  useEffect(() => {
    if (!editor || !activeFile) return;
    if (editor.getValue() !== getActiveFile()?.file?.content)
      editor.setValue(getActiveFile()?.file?.content);
    editor.on("change", handleEditorChange);
    return () => {
      editor.off("change", handleEditorChange);
    };
  }, [editor, activeFile]);
  return (
    <div>
      <div className="flex justify-between items-center gap-4 mb-3">
        <div className="inline-flex items-center gap-1">
          {[...filesMap].map(([name, file], key) => (
            <button
              key={key + name}
              className={clsx("px-2 hover:bg-gray-200 dark:hover:bg-gray-800", {
                "bg-gray-200 dark:bg-gray-800": name === getActiveFile()?.name
              })}
              onClick={() => {
                setActiveFile([name, file] || null);
              }}
            >
              {name}
            </button>
          ))}
        </div>
        <button
          type="button"
          title="Add File"
          className="p-2 hover:bg-gray-200 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-800"
        >
          <FaPlus size={16} />
        </button>
      </div>

      <div ref={editorRef} />
    </div>
  );
}
