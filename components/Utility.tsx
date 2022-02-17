import { Transition } from "@headlessui/react";
import { useIsomorphicLayoutEffect } from "ahooks";
import clsx from "clsx";
import { useDarkMode } from "hooks/useDarkMode";
import Image from "next/image";
import { ElementType, PropsWithChildren, useEffect, useState } from "react";

export const DelayedView = ({
  as = "div",
  delay = "delay-500",
  duration = "duration-1000",
  className,
  children,
  defaultShow = true
}: PropsWithChildren<{
  as?: ElementType;
  className?: string;
  delay?: string;
  duration?: string;
  defaultShow?: boolean;
}>) => {
  const [show, setShow] = useState(defaultShow);
  useIsomorphicLayoutEffect(() => setShow(true), [defaultShow]);
  return (
    <Transition
      as={as}
      appear
      show={show}
      className={clsx("transition-opacity", duration, delay, className)}
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      {children}
    </Transition>
  );
};

export const IconGram = ({
  path,
  size = 24
}: {
  path: string;
  size?: number;
}) => {
  const { dark } = useDarkMode();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? (
    <Image
      width={24}
      height={24}
      priority
      src={`https://icongr.am/${path}.svg?size=${size}&color=${
        dark ? "ffffff" : "000000"
      }`}
    />
  ) : (
    <i className="hidden"></i>
  );
};

export const TagsCloud = ({ data }: { data: string[] }) => (
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
