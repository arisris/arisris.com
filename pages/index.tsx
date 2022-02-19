import { AboutMe } from "components/AboutMe";
import { LatestUpdatedRepos } from "components/LatestUpdatedRepos";
import Layout from "components/Layout";
import { getLatestUpdatedRepo } from "lib/github";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

export default function Page({ latestUpdatedRepos }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <Layout showFooterLinks={false}>
      <AboutMe showDesc={true} />
      <LatestUpdatedRepos data={latestUpdatedRepos} />
    </Layout>
  );
}

export const getStaticProps: GetServerSideProps = async () => {
  const latestUpdatedRepos = await getLatestUpdatedRepo();
  return {
    props: {
      latestUpdatedRepos
    },
    revalidate: 3600
  };
};
