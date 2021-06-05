import Head from "next/head"
import Link from "next/link"
import Layout from "@/components/Layout"
import PostCard from "@/components/PostCard"
export default function PageHome() {
  return (
    <Layout>
      <Head>
        <title>Aris Dev</title>
      </Head>
      <div className="block text-center my-16">
        <h1 className="text-4xl font-black mb-10 text-purple-700">Hello :)</h1>
        <p className="mb-10">
          I'm <span className="underline">Aris</span>, an experienced software engineer from
          Indonesia who focuses on fullstack Web Development.
        </p>
        <p>
          <Link href="/about-me">
            <a className="font-black py-3 px-8 rounded ring ring-purple-700 hover:ring-purple-900 text-purple-700 hover:text-purple-900">Explore &raquo;</a>
          </Link>
        </p>
      </div>
    </Layout>
  )
}
