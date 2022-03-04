import LayoutTools from "components/LayoutTools";
import { useEsBuild } from "hooks/bundler";
import Link from "next/link";
import { useEffect } from "react";

const example = `
import mitt from "mitt";

console.log(mitt)
`;

export default function Page() {
  const esbuild = useEsBuild();
  useEffect(() => {
    if (!esbuild.ready) return;
    esbuild
      .createBundle()
      .then((a: any) => console.log(a.code))
      .catch((e) => console.error(e));
  }, [esbuild.ready]);
  return (
    <LayoutTools
      title="Useful Tools For Developers"
      description="Some tools for developers"
    >
      <div className="prose dark:prose-invert">
        <ul className="s list-decimal">
          <li>
            <Link href="/free-html5-templates">
              <a>Free HTML5 sss</a>
            </Link>
          </li>
        </ul>
      </div>
    </LayoutTools>
  );
}
