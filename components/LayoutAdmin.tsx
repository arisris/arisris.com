import clsx from "clsx";
import Layout, { LayoutProps } from "./Layout";
import Link from "next/link";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { FaBook, FaCogs, FaGitAlt, FaHome, FaSort } from "react-icons/fa";
import { useClickAway } from "ahooks";
import Router, { useRouter } from "next/router";

const menuItem: MenuItemProps[] = [
  {
    title: "Dashboard",
    icon: FaHome,
    onClick: () => {
      Router.push("/admin");
    }
  },
  {
    title: "Snipet",
    icon: FaGitAlt,
    onClick: () => {
      Router.push("/admin/snipet");
    }
  },
  {
    title: "Guestbook",
    icon: FaBook
  },
  {
    title: "Settings",
    icon: FaCogs
  }
];

type MenuItemProps = {
  title: string;
  active?: boolean;
  icon?: IconType;
  after?: ReactElement | ReactNode;
  onClick?: (e: any) => void;
};

const MenuItem = (props: MenuItemProps) => (
  <div
    className={clsx(
      "flex items-center justify-between gap-2 p-2 w-full cursor-pointer",
      {
        "bg-gray-100 dark:bg-gray-800": props.active
      }
    )}
    onClick={(e) => {
      if (props.onClick) props.onClick(e);
    }}
  >
    {props.icon && <props.icon size={20} />}
    {<h5 className="flex-auto">{props.title}</h5>}
    {props.after && <div className="text-xs">{props.after}</div>}
  </div>
);

const Menu = () => {
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
        <div>
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
          <MenuItem
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

function LayoutAdmin({ children, ...props }: LayoutProps) {
  return (
    <Layout {...props}>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="relative w-full sm:w-4/12">
          <Menu />
        </div>
        <div className="w-full sm:w-8/12 py-2">{children}</div>
      </div>
    </Layout>
  );
}
export default LayoutAdmin;
