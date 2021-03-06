import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaPrint } from "react-icons/fa";
import { IconType } from "react-icons/lib";

const IconWithLink = ({
  icon,
  href
}: {
  icon?: ReactElement<IconType>;
  href: string;
}) => (
  <div className="flex gap-2 items-center">
    {icon}
    <Link href={href}>
      <a>{href}</a>
    </Link>
  </div>
);

export default function PageCV() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div>Loading...</div>;
  return (
    <section className="flex flex-col max-w-screen-md mx-auto p-8 gap-8">
      <Head>
        <title>Arisris.com CV</title>
      </Head>
      <header className="flex flex-col sm:flex-row items-center">
        <div className="w-full text-center sm:w-4/12 lg:w-2/12">
          <Image
            className="rounded-md"
            src="/documents/avatar.png"
            width="200px"
            height="200px"
          />
        </div>
        <div className="w-full sm:w-8/12 lg:w-10/12 flex flex-col items-center text-center self-start text-lg">
          <strong className="text-3xl mb-4">Aris Riswanto</strong>
          <p>Dsn. Sukasari RT/RW 01/013 Cintanagara, Jatinagara, Ciamis</p>
          <p>082240183482 | me@arisris.com</p>
          <Link href="https://arisris.com">
            <a>https://arisris.com</a>
          </Link>
          <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-4 text-sm mt-4">
            <IconWithLink
              icon={<FaLinkedin size="16" />}
              href="https://linkedin.com/in/arisris"
            />
            <IconWithLink
              icon={<FaGithub size="16" />}
              href="https://github.com/arisris"
            />
            <IconWithLink
              icon={<FaFacebook size="16" />}
              href="https://fb.me/arisfungratis"
            />
          </div>
        </div>
      </header>
      <div className="prose dark:prose-invert max-w-full">
        <h2 className="border-b px-2">Objective</h2>
        <p>
          As a web developer I always try to focus on the projects I'm working
          on so that I can get perfect results.
          <br />
          As an open source enthusiastic I always look to the future to update
          latest knowledge and technology.
        </p>
        <h2 className="border-b px-2">Skills</h2>
        <ul>
          <li>Backend : Node.js, PHP</li>
          <li>Database : Basic SQL, NoSQL</li>
          <li>Frontend : Next.js/React, Tailwind</li>
          <li>Web Scraping: Apify, Crawler.js</li>
          <li>I can working with : linux, git, bash, vm</li>
          <li>Basic knowledge about cloud infrastructure: AWS, GCP, etc</li>
          <li>Soft skill : Can translate a Web Prototypes to real Web</li>
        </ul>
        <h2 className="border-b px-2">Experience</h2>
        <ul>
          <li>
            <div className="flex justify-between gap-2">
              <strong>Venturi Digital Studio</strong>
              <time>2021 - 2021</time>
            </div>
            <p>
              Remote Senior Frontend Developer
              <br />
              Develop{" "}
              <a target="_blank" href="https://dosoon.id">
                dosoon.id
              </a>{" "}
              homepage and administrator frontend using next.js
            </p>
          </li>
          <li>
            <div className="flex justify-between gap-2">
              <strong>Fullstack Web Developer</strong>
              <time>2018 - Now</time>
            </div>
            <p>
              Freelancer
              <br />
              Working as a freelancer, Develop and Maintain production project
            </p>
          </li>
          <li>
            <div className="flex justify-between gap-2">
              <strong>Self employed</strong>
              <time>2015 - 2017</time>
            </div>
            <p>
              Web Hosting Startup
              <br />I experience opened a litle web hosting startup called
              SKSNet. However, this startup did not last long because of the
              problem of its own capital. This startup is sell hosting and vps
              server, domain + ssl certificate for customer.
            </p>
          </li>
        </ul>

        <h2 className="border-b px-2">Projects</h2>
        <ul>
          <li>
            <div className="flex justify-between gap-2">
              <strong>Develop a motorcycle lnstallment app system</strong>
              <time>2021</time>
            </div>
            <p>
              Done: Develop and modify Joomla custom plugin. integrate with
              current database system, Design form etc.
              <br />
              Clients: Panprisa Motor, yamahadepok.com
            </p>
          </li>
          <li>
            <div className="flex justify-between gap-2">
              <strong>Maintain system @ surala.co.id</strong>
              <time>2021</time>
            </div>
            <p>
              Done: Create modify codeigniter based web app. depelop some
              feature for this site.
              <br />
              Client: Surala
            </p>
          </li>
          <li>
            <div className="flex justify-between gap-2">
              <strong>Develop ID Card maker System</strong>
              <time>2021</time>
            </div>
            <p>
              Desc: Develop System ID Card maker for registered member. web app
              based on laravel framework{" "}
              <a target="_blank" href="https://app.upbukarelsadsuitubun.com">
                https://app.upbukarelsadsuitubun.com
              </a>
              <br />
              Client: UPBU Karel Sad Suitubun
            </p>
          </li>
          <li>
            <div className="flex justify-between gap-2">
              <strong>Video Downloader App</strong>
              <time>2021</time>
            </div>
            <p>
              A web-based app video downloader website.
              <br />
              Users can search, browse many video from youtube source. listing a
              artist and their songs from many source of site like a joox, the
              website is SEO friendly using SSR based on Next.JS, its very fast
              using PWA and edge caching mechanism.
              <br />
              <b>Some stack i used.</b>
              <br />
              <br />
              Next.js
              <br />
              Tailwindcss
              <br />
              Node.js
              <br />
              Vercel
              <br />
              Production build.
              <br />
              <br />
              Link:&nbsp;&nbsp;
              <a target="_blank" href="https://vidl.vercel.app/">
                https://vidl.vercel.app/
              </a>
            </p>
          </li>
          <li>
            <div className="flex justify-between gap-2">
              <strong>Song lyrics app</strong>
              <time>2021</time>
            </div>
            <p>
              A web-based app contain million song lyrics.
              <br />
              Users can search, browse lyrics or artists, read lyrics. the
              website is SEO friendly, very very fast using PWA and edge caching
              mechanism.
              <br />
              I made it just less than one week from scratch using some
              libraries and tools.
              <br />
              <br />
              <b>Some stack i used.</b>
              <br />
              <br />
              Next.js
              <br />
              Tailwindcss
              <br />
              Node.js
              <br />
              Vercel
              <br />
              Wordpress.com as api
              <br />
              Production build.
              <br />
              <br />
              Link:&nbsp;&nbsp;
              <a target="_blank" href="https://applirik.vercel.app/">
                https://applirik.vercel.app/
              </a>
            </p>
          </li>
        </ul>
      </div>
      <div className="fixed bottom-6 right-6 hidden-print">
        <a
          href="#"
          title="Print this page"
          onClick={(e) => (e.preventDefault(), window.print())}
        >
          <FaPrint
            size={48}
            className="p-2 text-green-500 transition hover:scale-95 focus:scale-95"
          />
        </a>
      </div>
      <style jsx>{`
        @media print {
          .hidden-print {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
