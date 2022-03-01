import clsx from "clsx";
import { CodeEditor } from "components/CodeEditor";
import LayoutTools from "components/LayoutTools";
import { useEffect, useRef, useState } from "react";

const fileItems = [
  {
    name: "index.tsx",
    content: `export default function Page() {
  return (
    <div>Hello Page</div>
  )
}`
  },
  {
    name: "sum.tsx",
    content: `export default () => 1+1;`
  },
  {
    name: "config.tsx",
    content: `export default {
  mode: "jsx"
}`
  }
];

export default function Page() {
  const [activeFile, setActiveFile] = useState<typeof fileItems[0]>(null);
  const [files, setFiles] = useState(fileItems);
  useEffect(() => {
    if (!activeFile) {
      const dt = files.length > 0 ? files[0] : null;
      setActiveFile(dt);
    }
  }, [activeFile]);
  const handleCodeChange = (code: string) => {
    const idx = files.indexOf(activeFile);
    if (idx !== -1) {
      files[idx].content = code;
      setFiles(files);
    }
  };

  return (
    <LayoutTools
      title="Online Javascript Bundler"
      description="Bundle NPM Modules on the fly (WIP)"
    >
      <div className="grid grid-cols-12 gap-4">
        {/* <strong className="col-span-4">Source Codes</strong> */}
        <div className="col-span-12 relative">
          <div className="flex justify-between items-center gap-4 mb-2">
            <div className="inline-flex items-center gap-1 overflow-x-auto pb-2">
              {files.map((file, key) => (
                <div key={key} className="inline-flex items-center gap-1">
                  <button
                    className={clsx(
                      "inline-flex gap-2 items-center px-2 hover:bg-gray-200 dark:hover:bg-gray-800",
                      {
                        "bg-gray-200 dark:bg-gray-800":
                          file.name === activeFile?.name
                      }
                    )}
                    onClick={() => {
                      setActiveFile(file);
                    }}
                  >
                    {file?.name}
                  </button>
                  <button
                    type="button"
                    className="inline-flexitems-center px-2 hover:bg-gray-200 dark:hover:bg-gray-800 font-bold"
                    onClick={(e) => {
                      let next = files.indexOf(file);
                      if (files.length > next + 1) {
                        next++;
                      } else if (files.length) {
                        next--;
                      }
                      setActiveFile(files[next]);
                      setFiles(files.filter((i) => i.name !== file.name));
                    }}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              title="Add File"
              className="px-2 hover:bg-gray-200 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-800 font-bold text-lg"
              onClick={() => {
                const newFile = window.prompt("Insert New File Name!");
                if (newFile) {
                  if (files.findIndex((i) => i.name === newFile) === -1) {
                    files.push({
                      name: newFile,
                      content: ""
                    });
                    setFiles(files);
                    setActiveFile([...files].pop());
                  }
                }
              }}
            >
              +
            </button>
          </div>
          <CodeEditor
            value={activeFile?.content}
            name={activeFile?.name}
            onChange={handleCodeChange}
          />
        </div>
      </div>
    </LayoutTools>
  );
}
