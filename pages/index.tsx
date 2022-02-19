import { AboutMe } from "components/AboutMe";
import { LatestUpdatedRepos } from "components/LatestUpdatedRepos";
import Layout from "components/Layout";
import { useEffect, useState } from "react";
export default function Page() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <Layout showFooterLinks={false}>
      <AboutMe showDesc={true} />
      {mounted && <LatestUpdatedRepos />}
    </Layout>
  );
}
