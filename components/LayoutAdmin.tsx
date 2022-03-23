import Layout, { LayoutProps } from "./Layout";
import { FaBook, FaCogs, FaGitAlt, FaHome } from "react-icons/fa";
import Router from "next/router";
import { Dropdown, DropdownItemProps } from "./Dropdown";

const menuItem: DropdownItemProps[] = [
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

function LayoutAdmin({ children, ...props }: LayoutProps) {
  return (
    <Layout {...props}>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="relative w-full sm:w-4/12">
          <Dropdown menuItem={menuItem} />
        </div>
        <div className="w-full sm:w-8/12 py-2">{children}</div>
      </div>
    </Layout>
  );
}
export default LayoutAdmin;
