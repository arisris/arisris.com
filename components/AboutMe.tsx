import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import user from "data/about-me";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { DelayedView, TagsCloud } from "./Utility";

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
            src={user.avatar}
            priority
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {user.network.map((i, index) => (
            <a
              key={index}
              title={i.name}
              className="flex items-center p-2"
              href={i.url}
              target={"_blank"}
            >
              <i.icon size={24} />
            </a>
          ))}
        </div>
      </div>
      <div className="col-span-12 mt-4 sm:mt-auto sm:col-span-7 sm:col-start-6 text-justify sm:self-start gap-4">
        <DelayedView as="h1" delay="delay-100" className="text-4xl font-bold">
          {user.name}
        </DelayedView>
        <DelayedView as="p" delay="delay-500" className="text-xl">
          {user.title}
        </DelayedView>
        {showDesc && (
          <DelayedView
            as="p"
            delay="delay-1000"
            className="mt-5 mb-10 leading-relaxed font-light"
          >
            {user.description}
          </DelayedView>
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
          scrollToElementId("#navbar");
        }}
        appear
      >
        <h2 className="text-2xl mb-6 font-bold">About</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
          {user.about.map((i, index) => (
            <div
              key={index}
              className={clsx("flex items-center gap-4 py-2", {
                "sm:justify-end": index % 2 === 1
              })}
            >
              <i.icon size={24} />
              <span className="italic">{i.name}</span>
            </div>
          ))}
        </div>
        <div className="mb-10">
          <h3 className="text-2xl my-4">Knowledgebase:</h3>
          <p>{user.knowledgebase}</p>
          {/* Comments */}
          {Object.entries(user.skills).map(([key, item], index) => (
            <div key={index}>
              <h3 className="text-xl my-4">{key}:</h3>
              <TagsCloud data={item} />
            </div>
          ))}
        </div>
      </Transition>

      <div
        className="col-span-12 sm:col-span-6 sm:col-start-4"
        id="exploredButton"
      >
        <button
          type="button"
          className="w-full inline-flex items-center justify-center gap-4 text-xl animate-pulse"
          onClick={(e) => {
            setExplored(!explored);
          }}
        >
          <span>{explored ? "Hide Me" : "Explore Me"}</span>
          {explored ? <FaCaretUp /> : <FaCaretDown />}
        </button>
      </div>
    </DelayedView>
  );
}
