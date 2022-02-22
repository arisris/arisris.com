import { Transition } from "@headlessui/react";
import { useIsomorphicLayoutEffect } from "ahooks";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { ElementType, HTMLProps, PropsWithChildren, ReactElement, useEffect, useState } from "react";
import { FaCircleNotch, FaRedo } from "react-icons/fa";

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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? (
    <Image
      width={24}
      height={24}
      priority
      src={`https://icongr.am/${path}.svg?size=${size}&color=${
        resolvedTheme === "dark" ? "ffffff" : "000000"
      }`}
    />
  ) : (
    <i className="w-6 h-6 bg-gray-400"></i>
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

export function SpinLoading({
  text,
  className
}: PropsWithChildren<{ text: string; className?: string }>) {
  return (
    <div className={clsx('flex justify-center items-center gap-2', className)}>
      <FaRedo className="w-4 h-4 animate-spin" />
      <span>{text}</span>
    </div>
  );
}

type SkeletonProps = {
  as?: string;
  animate?: "ping" | "pulse";
  show?: boolean;
  className?: string;
  children?: any;
  loadingChildren?: JSX.Element | JSX.Element[];
};

export function Skeleton({
  animate = "pulse",
  show = true,
  className,
  loadingChildren,
  children,
  ...props
}: SkeletonProps & HTMLProps<HTMLDivElement>) {
  return show ? (
    <div
      className={clsx(
        "p-2 rounded-md bg-gray-300 dark:bg-gray-700 cursor-wait",
        {
          "animate-ping": animate === "ping",
          "animate-pulse": animate === "pulse"
        },
        className
      )}
      {...props}
    >
      {loadingChildren}
    </div>
  ) : (
    children || null
  );
}

export function RequireAuth({ children }: { children: ReactElement }) {
  const { status } = useSession({ required: true });
  if (status === "authenticated") return children;
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center">
      <div className="prose dark:prose-invert flex flex-col items-center">
        {status === "loading" && (
          <FaCircleNotch size={32} className="animate-spin" />
        )}
        <h2>{status === "loading" ? "Loading..." : "Unauthenticated!"}</h2>
      </div>
    </div>
  );
}