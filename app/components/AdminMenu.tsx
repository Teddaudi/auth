// import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import avatar from "../../images/avatar.png"
import profile from "../../images/profile.png"
import logout from "../../images/logout.png"
import documentVerification from "../../images/subject.png"
import transaction from "../../images/assignment.png"
import home from "../../images/home.png"
import axios from "axios";
import toast from "react-hot-toast";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: home,
        label: "Dashboard",
        href: "/admin-dashboard",
        visible: ["admin-dashboard",],
      },
      {
        icon: profile,
        label: "Users",
        href: "/list/users",
        visible: ["/admin-dashboard"],
      },
      // {
      //   icon: documentVerification,
      //   label: "User Verification",
      //   href: "/list/verification",
      //   visible: ["admin-dashboard"],
      // },
      {
        icon: transaction,
        label: "Create Message",
        href: "/list/message",
        visible: ["admin-dashboard"],
      }
    ],
  },
];

const AdminMenu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
          })}
        </div>
      ))}
    </div>
  );
};

export default AdminMenu;
