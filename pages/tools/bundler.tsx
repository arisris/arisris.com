import { useMap } from "ahooks";
import clsx from "clsx";
import { CodeEditor } from "components/CodeEditor";
import LayoutTools from "components/LayoutTools";
import { useCallback, useEffect, useState } from "react";
import { FaCircleNotch, FaPlay } from "react-icons/fa";
import { rollup } from "rollup";
import { virtualFs } from "rollup-plugin-virtual-fs";

const fileItems = new Map<string, string>([
  ["main.js", `import sum from "./sum.js";\nconsole.log(sum);`],
  ["sum.js", `export default (i) => i+1;`],
  [
    "config.js",
    `export default {
    jsx: true
  }`
  ]
]);

const bundleWithRollup = async (filesMap: typeof fileItems) => {
  const files: { [k: string]: string } = [...filesMap].reduce(
    (a, b) => ((a[b[0].startsWith("/") ? b[0] : "/" + b[0]] = b[1]), a),
    {}
  );
  console.log(files);
  const result = await rollup({
    input: "/main.js",
    plugins: [virtualFs({ files, memoryOnly: true })]
  });
  console.log(result);
  return result;
};

export default function Page() {
  const [activeFile, setActiveFile] = useState<string>(null);
  const [bundleStatus, setBundleStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [output, setOutput] = useState<string>(null);
  const [files, setFilesMap] = useState(fileItems);

  useEffect(() => {
    if (!activeFile) setActiveFile(files.size > 0 ? "main.js" : null);
  }, [activeFile]);
  const handleCodeChange = (code: string) => {
    if (files.has(activeFile)) {
      files.set(activeFile, code);
      setFilesMap(files);
    }
  };
  const handleBundleClick = async () => {
    setBundleStatus("loading");
    try {
      const bundler = await bundleWithRollup(files);
      const { output } = await bundler.generate({ format: "iife" });
      if (output.length > 0) {
        setBundleStatus("success");
        setOutput(output[0].code);
        await bundler.close();
      }
    } catch (e) {
      console.error(e);
      setBundleStatus("error");
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
              {[...files].map(([file, content], key) => (
                <div key={key} className="inline-flex items-center gap-1">
                  <button
                    className={clsx(
                      "inline-flex gap-2 items-center px-2 hover:bg-gray-200 dark:hover:bg-gray-800",
                      {
                        "bg-gray-200 dark:bg-gray-800": file === activeFile
                      }
                    )}
                    onClick={() => {
                      setActiveFile(file);
                    }}
                  >
                    {file}
                  </button>
                  <button
                    type="button"
                    className="inline-flexitems-center px-2 hover:bg-gray-200 dark:hover:bg-gray-800 font-bold"
                    onClick={(e) => {
                      if (file === "main.js" || file === "config.js") {
                        alert("Is Primary file not allowed to closed.");
                        return;
                      }
                      const clonedFiles = [...files];
                      let next = clonedFiles.findIndex(([f]) => f === file);
                      if (clonedFiles.length > next + 1) {
                        next++;
                      } else if (clonedFiles.length) {
                        next--;
                      }
                      setActiveFile(clonedFiles[next][0]);
                      files.delete(file);
                      setFilesMap(files);
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
                  if (!files.has(newFile)) {
                    files.set(newFile, ``);
                    setActiveFile(newFile);
                    setFilesMap(files);
                  }
                }
              }}
            >
              +
            </button>
          </div>
          <div className="relative">
            {/* {!esbuild.initialized ? (
              <div className="absolute w-full h-full">
                Initialize Bundler...
              </div>
            ) : null} */}
            <CodeEditor
              value={files.get(activeFile)}
              name={activeFile}
              onChange={handleCodeChange}
            />
            <div className="absolute right-2 bottom-6">
              <button
                type="button"
                className="px-4 rounded bg-green-500 text-white hover:bg-opacity-80 inline-flex gap-2 items-center"
                onClick={handleBundleClick}
              >
                <span>Bundle</span>
                {bundleStatus === "loading" ? (
                  <FaCircleNotch className="animate-spin" size={10} />
                ) : (
                  <FaPlay size={10} />
                )}
              </button>
            </div>
          </div>
          <div className="mt-4">
            {bundleStatus === "success" && (
              <>
                <strong>Result</strong>
                <CodeEditor value={output} name="main.js" />
              </>
            )}
          </div>
        </div>
      </div>
    </LayoutTools>
  );
}
