import { useClickAway } from "ahooks";
import clsx from "clsx";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { FaSort } from "react-icons/fa";

export type DropdownItemProps = {
  title: string;
  active?: boolean;
  icon?: IconType;
  after?: ReactElement | ReactNode;
  onClick?: (e: any) => void;
};

export const DropdownItem = (props: DropdownItemProps) => (
  <div
    className={clsx(
      "flex items-center justify-between gap-2 p-2 w-full cursor-pointer text-xs lg:text-sm hover:bg-gray-100 dark:hover:bg-gray-800",
      {
        "bg-gray-100 dark:bg-gray-800": props.active
      }
    )}
    onClick={(e) => {
      if (props.onClick) props.onClick(e);
    }}
  >
    {props.icon && <props.icon size={16} />}
    {<h5 className="flex-auto">{props.title}</h5>}
    {props.after && <div className="text-xs">{props.after}</div>}
  </div>
);

export const Dropdown = ({
  menuItem,
  className
}: {
  className?: string;
  menuItem: DropdownItemProps[];
}) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const subscriber = () => {
      if (!menuItem[currentIndex]) {
        setShow(false);
        setCurrentIndex(null);
      }
    };
    router.events.on("routeChangeComplete", subscriber);
    return () => router.events.off("routeChangeComplete", subscriber);
  }, [router]);
  useClickAway(() => {
    if (show) setShow(false);
  }, ref);
  return (
    <div ref={ref} className={clsx("relative flex flex-col gap-4", className)}>
      <button
        type="button"
        className="w-full flex justify-between items-center px-4 py-2 ring-1 focus:ring rounded-md"
        onClick={(e) => {
          e.preventDefault();
          setShow(!show);
        }}
      >
        <div className="text-xs">
          {currentIndex === null ? "Select Menu" : menuItem[currentIndex].title}
        </div>
        <FaSort size={16} />
      </button>
      <div
        className={clsx(
          "absolute top-12 inset-x-0 z-10 bg-gray-900 shadow-md flex-col divide-y dark:divide-gray-800 space-y-[.01rem] rounded-md py-2",
          {
            flex: show,
            hidden: !show
          }
        )}
      >
        {menuItem.map(({ onClick, ...item }, index) => (
          <DropdownItem
            onClick={(e) => {
              setShow(false);
              setCurrentIndex(index);
              if (onClick) onClick(e);
            }}
            key={index}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};
