import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
export default function PageHome({ posts }) {
  return (
    <Layout withHero={{ title: "Latest Posts", subtitle: "Note: For now all post is just an for example" }}>
      <Head>
        <title>Blog Posts</title>
      </Head>
      <div className="block text-center">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
      
    </Layout>
  );
}
export async function getStaticProps() {
  const { getAllPost } = await import("lib/posts");
  let posts = await getAllPost();
  posts = posts.map((post) => (delete post.content, post));
  return {
    props: {
      posts,
    },
  };
}
