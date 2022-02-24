import Layout from "components/Layout";
import { useModal } from "hooks/useModal";
import Link from "next/link";

export default function Page() {
  const dialog = useModal();
  return (
    <Layout title="Code Snipet">
      <div className="prose dark:prose-invert">
        <ul className="s list-decimal">
          <li>
            <Link href="/free-html5-templates">
              <a>Free HTML5 Templates</a>
            </Link>
          </li>
        </ul>
      </div>
    </Layout>
  );
}
