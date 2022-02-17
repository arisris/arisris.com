import { AboutMe } from "components/AboutMe";
import { Guestbook } from "components/Guestbook";
import { LatestUpdatedRepos } from "components/LatestUpdatedRepos";
import Layout from "components/Layout";
import { getAllGuestbook } from "lib/fauna";
import { getLatestUpdatedRepo } from "lib/github";
import { NextPageContext } from "next";
export default function Page({
  latestUpdatedRepos,
  allGuestbook
}: {
  latestUpdatedRepos: any;
  allGuestbook: any
}) {
  return (
    <Layout>
      <AboutMe showDesc={true} />
      <LatestUpdatedRepos data={latestUpdatedRepos} />
      <Guestbook />
    </Layout>
  );
}

export async function getStaticProps(ctx: NextPageContext) {
  const latestUpdatedRepos = await getLatestUpdatedRepo();
  const allGuestbook = await getAllGuestbook(10);
  return {
    props: {
      latestUpdatedRepos,
      allGuestbook
    }
  };
}
