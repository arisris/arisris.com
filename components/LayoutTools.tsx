import Layout, { LayoutProps } from "./Layout";
import {
  FaCode,
  FaImage,
  FaJs,
  FaLink,
  FaLock,
  FaMarkdown,
  FaQrcode
} from "react-icons/fa";
import Router from "next/router";
import clsx from "clsx";
import { Dropdown, DropdownItemProps } from "./Dropdown";

const menuItem: DropdownItemProps[] = [
  {
    title: "Hash",
    icon: FaLock,
    onClick: () => {
      Router.push("/tools/hash");
    }
  },
  {
    title: "Base64 Encode/Decode",
    icon: FaCode,
    onClick: () => {
      Router.push("/tools/base64");
    }
  },
  {
    title: "URL Encode/Decode",
    icon: FaLink,
    onClick: () => {
      Router.push("/tools/urlencode");
    }
  },
  {
    title: "HTML To Markdown",
    icon: FaMarkdown,
    onClick: () => {
      Router.push("/tools/html-to-markdown");
    }
  },
  {
    title: "Markdown To HTML",
    icon: FaMarkdown,
    onClick: () => {
      Router.push("/tools/markdown-to-html");
    }
  },
  {
    title: "Online JS Bundler",
    icon: FaJs,
    onClick: () => {
      Router.push("/tools/bundler");
    }
  }
  // {
  //   title: "QR Code Generator",
  //   icon: FaQrcode
  // },
  // {
  //   title: "Image To Base64",
  //   icon: FaImage
  // },
];

function LayoutTools({
  children,
  ...props
}: LayoutProps & { hiddenPanel?: boolean }) {
  return (
    <Layout {...props}>
      <div className={clsx("py-2 block w-full")}>
        {props.title && <h1 className="text-2xl font-bold">{props.title}</h1>}
        {props.description && (
          <div className="text-sm">{props.description}</div>
        )}
        {!props.hiddenPanel && <Dropdown className="mt-3 py-4 border-t dark:border-gray-800" menuItem={menuItem} />}
        <div className="prose dark:prose-invert min-w-full mt-2 pt-4">
          {children}
        </div>
      </div>
    </Layout>
  );
}
export default LayoutTools;
