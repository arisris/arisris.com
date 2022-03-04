import { useClickAway, useDebounceEffect } from "ahooks";
import clsx from "clsx";
import { CodeEditor } from "components/CodeEditor";
import LayoutTools from "components/LayoutTools";
import { bundlerTools, bundleWithRollup } from "lib/redux/bundlerTools";
import { useAppDispatch, useAppSelector } from "lib/redux/store";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

export default function Page() {
  const { add, remove, update, setCurrentFile, setOutputFormat } =
    bundlerTools.actions;
  const { currentFile, sources, output, status, outputFormat } =
    useAppSelector().bundlerTools;
  const dispatch = useAppDispatch();
  useDebounceEffect(
    () => {
      dispatch(bundleWithRollup({ format: outputFormat, name: "main" }));
    },
    [sources, outputFormat],
    { wait: 1000 }
  );

  return (
    <LayoutTools
      title="Online Javascript Bundler"
      description="Bundle NPM Modules on the fly (WIP)"
      hiddenPanel
    >
      <div className="grid grid-cols-12 gap-2">
        {/* <strong className="col-span-4">Source Codes</strong> */}
        <div className="col-span-12 relative">
          <div className="flex justify-between items-center gap-4 mb-2">
            <div className="inline-flex items-center gap-1 overflow-x-auto pb-2">
              {Object.keys(sources).map((file, key) => (
                <div key={key} className="inline-flex items-center gap-1">
                  <button
                    className={clsx(
                      "inline-flex gap-2 items-center px-2 hover:bg-gray-200 dark:hover:bg-gray-800",
                      {
                        "bg-gray-200 dark:bg-gray-800": file === currentFile
                      }
                    )}
                    onClick={() => dispatch(setCurrentFile(file))}
                  >
                    {file}
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-2 hover:bg-gray-200 dark:hover:bg-gray-800 font-bold"
                    onClick={() => {
                      if (file === "main.js" || file === "config.js") {
                        alert("Is Primary file not allowed to closed.");
                        return;
                      }
                      dispatch(remove(file));
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
                if (newFile && !sources[newFile]) {
                  dispatch(add({ name: newFile, value: `` }));
                }
              }}
            >
              +
            </button>
          </div>
          <CodeEditor
            code={sources[currentFile] || ""}
            filename={currentFile}
            onChange={(code) => dispatch(update(code))}
            className="h-64"
          />
        </div>
        <div className="col-span-12 flex justify-between items-center">
          <strong>
            {status.type === "progress" && "Bundling..."}
            {status.type === "idle" && "Idle"}
            {status.type === "failed" && "Result Failed"}
            {status.type === "success" && "Result Success"}
          </strong>
          <SelectOutputType
            lists={[
              "amd",
              "commonjs",
              "esm",
              "iife",
              "systemjs",
              "umd"
            ]}
            defaultValue={outputFormat}
            onSelected={(v) =>
              dispatch(setOutputFormat(v as typeof outputFormat))
            }
          />
        </div>
        <div className="col-span-12">
          {status.type === "success" || status.type === "failed" ? (
            <CodeEditor
              code={output || ""}
              filename="output.js"
              className="h-64"
              disabled
            />
          ) : (
            <div className="h-64 flex justify-center items-center">Loading</div>
          )}
        </div>
      </div>
    </LayoutTools>
  );
}

const SelectOutputType = (
  props: PropsWithChildren<{
    lists: string[];
    defaultValue: string;
    onSelected?: (s: string) => void;
  }>
) => {
  const [active, setActive] = useState(false);
  const [currentValue, setCurrentValue] = useState(props.defaultValue);
  const ref = useRef();
  useClickAway(() => {
    if (active) setActive(false);
  }, ref);
  return (
    <div ref={ref} className="relative px-2 w-32 text-xs" role={"listbox"}>
      {currentValue && (
        <div
          role={"option"}
          className={clsx(
            "flex justify-between items-center px-2 py-1 border border-gray-500 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 cursor-pointer rounded"
          )}
          onClick={() => {
            setActive(true);
          }}
        >
          <span className="font-bold">{currentValue}</span>
          <span className="font-bold">*</span>
        </div>
      )}
      <div
        className={clsx(
          "absolute border border-gray-500 w-full top-0 bg-gray-50 rounded",
          {
            hidden: !active
          }
        )}
      >
        {props.lists.map((i) => (
          <div
            key={i}
            role={"option"}
            className={clsx(
              "p-2 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-white text-black cursor-pointer",
              {
                "bg-gray-300": props.defaultValue == i
              }
            )}
            onClick={() => {
              setActive(false);
              setCurrentValue(i);
              props.onSelected && props.onSelected(i);
            }}
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
};
