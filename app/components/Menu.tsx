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
        label: "Home",
        href: "/home",
        visible: ["home",],
      },
      {
        icon: profile,
        label: "Profile",
        href: "/list/profile",
        visible: ["home"],
      },
      {
        icon: documentVerification,
        label: "Document Verification",
        href: "/list/verfication",
        visible: ["home"],
      },
      {
        icon: transaction,
        label: "Transactions",
        href: "/list/transaction",
        visible: ["home"],
      }
    ],
  },
  // {
  //   title: "OTHER",
  //   items: [
  //     {
  //       icon: logout,
  //       label: "Logout",
  //       href: "/signin", // You can still provide href for visual purposes
  //       visible: ["home"],
  //       action: async () => {
  //         console.log("Logging out...");
  //         try {
  //           // Assuming your API has a /logout endpoint to handle logout
  //           await axios.get('/api/users/logout');
  //           toast.success('Logout successful');
  //           // Redirect to signin page after logout
  //           window.location.href = '/signin'; // Use window.location.href to navigate
  //         } catch (error:any) {
  //           toast.error(error.message || "An error occurred while logging out.");
  //         }
  //       },
  //     },
  //   ],
  // },
];

const Menu = () => {
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

export default Menu;
