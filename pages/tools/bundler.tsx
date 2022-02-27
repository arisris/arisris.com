import { CodeEditor, CodeEditorFiles } from "components/CodeEditor";
import LayoutTools from "components/LayoutTools";
import { useState } from "react";

const fileItems: CodeEditorFiles = new Map([
  [
    "index.tsx",
    {
      content: `export default function Page() {
  return (
    <div>Hello Page</div>
  )
}`
    }
  ],
  [
    "sum.ts",
    {
      content: `export default () => 1+1;`
    }
  ],
  [
    "config.ts",
    {
      content: `export default {
  mode: "jsx"
}`
    }
  ]
]);

export default function Page() {
  const [files, setFiles] = useState(fileItems);
  return (
    <LayoutTools
      title="Online Javascript Bundler"
      description="Bundle NPM Modules on the fly (WIP)"
    >
      <div className="grid grid-cols-12 gap-4">
        {/* <strong className="col-span-4">Source Codes</strong> */}
        <div className="col-span-12 relative">
          <CodeEditor
            defaultFile="index.tsx"
            filesMap={files}
            onFileChange={(name, content) => {
              console.log("C")
              setFiles((file) =>
                file.set(name, { ...file.get(name), content })
              );
            }}
          />
        </div>
      </div>
    </LayoutTools>
  );
}
