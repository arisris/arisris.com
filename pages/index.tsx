import { AboutMe } from "components/AboutMe";
import { Guestbook } from "components/Guestbook";
import { LatestUpdatedRepos } from "components/LatestUpdatedRepos";
import Layout from "components/Layout";
import { getAllGuestbook } from "lib/fauna";
import { getLatestUpdatedRepo } from "lib/github";
import { NextPageContext } from "next";
export default function Page({
  latestUpdatedRepos
}: {
  latestUpdatedRepos: any;
  allGuestbook: any;
}) {
  return (
    <Layout>
      <AboutMe showDesc={true} />
      {latestUpdatedRepos && <LatestUpdatedRepos data={latestUpdatedRepos} />}
      <Guestbook />
    </Layout>
  );
}

export async function getStaticProps(ctx: NextPageContext) {
  const latestUpdatedRepos = await getLatestUpdatedRepo();
  return {
    props: {
      latestUpdatedRepos: latestUpdatedRepos || null
    }
  };
}
