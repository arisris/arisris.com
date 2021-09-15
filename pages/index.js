import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import Layout from "@/components/Layout"
import { TypedText } from "@/components/TypedText"
export default function PageHome() {
  return (
    <Layout>
      <Head>
        <title>Aris Dev</title>
      </Head>
      <div className="flex flex-col justify-center items-center my-16">
        <h1 className="text-4xl font-black mb-10 text-purple-700">Hello :)</h1>
        <div className="mb-10">
          <img
            alt="arisris"
            className="ring-4 ring-purple-800 rounded-full"
            src="https://avatars.githubusercontent.com/u/62107426?v=4"
          />
        </div>
        <div className="mb-10 text-center text-xl font-bold">
          Hello, My name is <span className="underline">Aris Riswanto</span>
          <br /> And i'm a <br />
          <TypedText
            className="inline-block text-purple-800"
            options={{
              strings: [
                "Fullstack Web developer",
                "React Developer",
                "Next.js Developer",
                "Nodejs Developer",
                "PHP Developer",
                "Laravel Developer",
                "Web Scraping Specialist",
                "Data Mining Specialist"
              ],
            }}
          />
          <br />I love web programing since 2009
        </div>
        <p>
          <Link href="/about-me">
            <a className="font-black py-3 px-8 rounded ring ring-purple-700 hover:ring-purple-900 text-purple-700 hover:text-purple-900">
              Explore Me &raquo;
            </a>
          </Link>
        </p>
      </div>
    </Layout>
  )
}
