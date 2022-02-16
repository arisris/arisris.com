import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import {
  FaCaretDown,
  FaCaretUp,
  FaDesktop,
  FaFacebook,
  FaGithub,
  FaHome,
  FaLinkedin,
  FaLinux,
  FaUser
} from "react-icons/fa";
import { DelayedView } from "./Utility";

const Tags = ({ data }: { data: string[] }) => (
  <div className="inline-flex flex-wrap">
    {data.map((i, index) => (
      <span
        className="text-sm px-2 py-[1px] ring-1 ring-gray-200 dark:ring-gray-800 dark:text-gray-300 rounded mr-2 mb-2"
        key={index}
      >
        {i}
      </span>
    ))}
  </div>
);

const scrollToElementId = (id: string) => {
  let el = document.querySelector(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

export function AboutMe({ showDesc = false }) {
  const [explored, setExplored] = useState(false);
  return (
    <DelayedView delay="delay-100" className="grid grid-cols-12 p-2">
      <div className="col-span-12 sm:col-span-4 flex flex-row sm:flex-col justify-between sm:justify-start sm:items-center self-start gap-2">
        <div className="relative">
          <Image
            width="200"
            height="200"
            alt="arisris"
            className="rounded-md"
            src="/documents/avatar.png"
            priority
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            title="Github"
            className="flex items-center p-2"
            href="https://github.com/arisris"
          >
            <FaGithub size={32} />
          </a>
          <a
            title="Facebook"
            className="flex items-center p-2"
            href="https://facebook.com/arisfungratis"
          >
            <FaFacebook size={32} />
          </a>
          <a
            title="LinkedIn"
            className="flex items-center p-2"
            href="https://linkedin.com/in/arisris"
          >
            <FaLinkedin size={32} />
          </a>
        </div>
      </div>
      <div className="col-span-12 mt-4 sm:mt-auto sm:col-span-7 sm:col-start-6 text-justify sm:self-start gap-4">
        <DelayedView as="h1" delay="delay-100" className="text-4xl font-bold">
          Aris Riswanto
        </DelayedView>
        <DelayedView as="p" delay="delay-300" className="text-xl">
          Jamstack Web Developer
        </DelayedView>
        {showDesc && (
          <>
            <hr />
            <br />
            <DelayedView
              as="p"
              delay="delay-500"
              className="mb-10 leading-relaxed"
            >
              I am a father of one kids, I started learning programming
              languages since <span className="underline">2009</span>. Actually
              I don't have an IT education background but I was very
              enthusiastic about learning programming languages from that time
              until now. I was born 30 years ago in Majalengka, And now I live
              with my family in Ciamis.
            </DelayedView>
          </>
        )}
      </div>
      <Transition
        id="exploredMe"
        as="div"
        show={explored}
        className="col-span-12 mb-6 transition-all delay-200"
        enter="duration-1000 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-500 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterEnter={() => {
          scrollToElementId("#exploredMe");
        }}
        afterLeave={() => {
          scrollToElementId("#exploredButton");
        }}
        appear
      >
        <h2 className="text-2xl mb-6 font-bold">About</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          {[
            [FaDesktop, "Works fulltime as a fullstack web developer"],
            [FaHome, "Work From Home"],
            [FaUser, "Was married and having one children"],
            [FaLinux, "Coding with linux"]
          ].map(([Icon, text], index) => (
            <div
              key={index}
              className={clsx("flex items-center gap-4 py-2", {
                "sm:justify-end": index % 2 === 1
              })}
            >
              <Icon size={24} />
              <span className="italic">{text}</span>
            </div>
          ))}
        </div>
        <div className="mb-10">
          <h3 className="text-2xl my-4">Knowledgebase:</h3>
          <p>
            I'm Experience with{" "}
            <strong>
              "Cloud Server, PWA, Jamstack, Rest Api, GraphQL, Web Scraper /
              Data Mining"
            </strong>{" "}
            technology
          </p>
          {/* Comments */}
          <h3 className="text-xl my-4">Backend:</h3>
          {<Tags data={["Node", "PHP", "SQL", "NoSQL", "?"]} />}
          {/* Comments */}
          <h3 className="text-xl my-4">Backend framework:</h3>
          {
            <Tags
              data={[
                "Laravel",
                "CI",
                "Totaljs",
                "Express",
                "GraphQL",
                "Crawler.js",
                "?"
              ]}
            />
          }
          <h3 className="text-xl my-4">Frontend:</h3>
          {
            <Tags
              data={[
                "React.js",
                "Next.js",
                "Redux+RTK",
                "jQuery",
                "Tailwind",
                "Bootstrap",
                "?"
              ]}
            />
          }
          {/* Comments */}
          <h3 className="text-xl my-4">Cloud Infrastructure such as:</h3>
          {
            <Tags
              data={[
                "AWS",
                "Google Cloud",
                "IBM Cloud",
                "Vercel",
                "Netlify",
                "Cloudflare",
                "Firebase",
                "Planetscale",
                "?"
              ]}
            />
          }
        </div>
      </Transition>

      <div
        className="col-span-12 sm:col-span-6 sm:col-start-4"
        id="exploredButton"
      >
        <button
          type="button"
          className="w-full inline-flex items-center justify-center gap-4 text-xl"
          onClick={(e) => {
            setExplored(!explored);
          }}
        >
          <span>Explore Me</span>
          {explored ? <FaCaretUp /> : <FaCaretDown />}
        </button>
      </div>
    </DelayedView>
  );
}
