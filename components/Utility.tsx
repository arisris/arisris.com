import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { ElementType, PropsWithChildren } from "react";

export const DelayedView = ({
  as = "div",
  delay = "delay-500",
  duration = "duration-1000",
  className,
  children
}: PropsWithChildren<{
  as?: ElementType;
  className?: string;
  delay?: string;
  duration?: string;
}>) => {
  return (
    <Transition
      as={as}
      appear
      show={true}
      className={clsx("transition-opacity", duration, delay, className)}
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      {children}
    </Transition>
  );
};