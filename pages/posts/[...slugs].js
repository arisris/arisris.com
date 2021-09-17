import Layout from "components/Layout";
import Head from "next/head";

export default function Posts({ post }) {
  return (
    <Layout withHero={{ title: post.title }}>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className="text-center">
        <div className="text-sm">
          <span className="p-1">Author: {post.author},</span>
          <span className="p-1">Date: {new Date(post.date).toDateString()},</span>
          <span className="p-1">Category: {post.category}</span>
        </div>
      </div>
      <div className="mt-8" dangerouslySetInnerHTML={{ __html: post.content }} />
    </Layout>
  )
}
export async function getStaticProps({ params: { slugs } }) {
  const { getSinglePost } = await import("@/libs/posts")
  const post = await getSinglePost(...slugs)
  return {
    props: { post },
  }
}
export async function getStaticPaths() {
  const { getAllPost } = await import("@/libs/posts")
  let paths = await getAllPost()
  paths = paths.map((post) => ({
    params: {
      slugs: [post.category, post.slug],
    },
  }))
  return {
    paths,
    fallback: false,
  }
}
