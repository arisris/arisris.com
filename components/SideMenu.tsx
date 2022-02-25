import { useClickAway } from "ahooks";
import clsx from "clsx";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { FaSort } from "react-icons/fa";

export type SideMenuItemProps = {
  title: string;
  active?: boolean;
  icon?: IconType;
  after?: ReactElement | ReactNode;
  onClick?: (e: any) => void;
};

export const SideMenuItem = (props: SideMenuItemProps) => (
  <div
    className={clsx(
      "flex items-center justify-between gap-2 p-2 w-full cursor-pointer text-xs lg:text-sm",
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

export const SideMenu = ({ menuItem }: { menuItem: SideMenuItemProps[] }) => {
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
    <div ref={ref} className="relative flex flex-col gap-4">
      <button
        type="button"
        className="sm:hidden w-full flex justify-between items-center px-4 py-2 ring-1 focus:ring rounded-md"
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
          "absolute top-12 inset-x-0 z-10 bg-gray-900 shadow-md sm:relative sm:inset-auto sm:z-auto sm:shadow-none sm:bg-transparent sm:flex flex-col divide-y dark:divide-gray-800 space-y-[.01rem]",
          {
            flex: show,
            hidden: !show
          }
        )}
      >
        {menuItem.map(({ onClick, ...item }, index) => (
          <SideMenuItem
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
