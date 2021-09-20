import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { TypedText } from '@/components/TypedText';
export default function PageHome() {
  return (
    <Layout>
      <Head>
        <title>Aris Dev</title>
      </Head>
      <div className="flex flex-col justify-center items-center my-16">
        <h1 className="text-4xl font-bold mb-10">Hello :)</h1>
        <div className="mb-10">
          <Image
            width="200"
            height="200"
            alt="arisris"
            className="rounded-full"
            src="/icons/arisris.jpeg"
          />
        </div>
        <div className="mb-10 text-center text-xl font-bold">
          Hello, My name is <span className="underline">Aris Riswanto</span>
          <br /> And i'm a <br />
          <TypedText
            className="inline-block text-purple-800 dark:text-blue-500"
            options={{
              strings: [
                'Fullstack Web developer',
                'React Developer',
                'Next.js Developer',
                'Jamstack Developer',
                'Nodejs Developer',
                'PHP Developer',
                'Laravel Developer',
                'Web Scraper'
              ]
            }}
          />
          <br />I love web programing since 2009
        </div>
        <p>
          <Link href="/about-me">
            <a className="font-black py-3 px-8 rounded ring ring-purple-700 hover:ring-purple-900 text-purple-700 hover:text-purple-900 dark:ring-gray-700 dark:hover:ring-gray-900 dark:text-gray-200 dark:hover:text-gray-300">
              Explore Me &raquo;
            </a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}
