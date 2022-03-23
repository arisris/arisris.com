import LayoutTools from "components/LayoutTools";
import Link from "next/link";

export default function Page() {
  return (
    <LayoutTools
      title="Useful Tools For Developers"
      description="Some tools for developers"
    >
      <div className="prose dark:prose-invert">
        <ul className="s list-decimal">
          <li>
            <Link href="/free-html5-templates">
              <a>Free HTML5 Templates</a>
            </Link>
          </li>
        </ul>
      </div>
    </LayoutTools>
  );
}
