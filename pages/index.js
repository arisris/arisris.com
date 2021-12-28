import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { TypedText } from '@/components/TypedText';
export default function PageHome() {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center my-16">
        <div className="mb-10 text-center text-xl font-bold">
          Hello, My name is <span className="underline">Aris Riswanto</span>
          <br /> And i'm work as a <br />
          <TypedText
            className="inline-block text-blue-700"
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
            <a className="font-black py-3 px-8 rounded ring ring-gray-800 hover:ring-gray-900 dark:text-gray-200 text-gray-700">
              Explore Me &raquo;
            </a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}
