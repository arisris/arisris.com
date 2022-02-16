import { AboutMe } from "components/AboutMe";
import Layout from "components/Layout";

export default function Page() {
  return (
    <Layout>
      <AboutMe showDesc={true} />
      <div className="p-2">
        <h3 className="text-2xl border-b">Latest Publication</h3>
      </div>
    </Layout>
  );
}
