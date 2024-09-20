"use client";
import { CodeProps } from "@/interface/AllProps";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ImHtmlFive } from "react-icons/im";
import { IoLogoCss3 } from "react-icons/io5";
import { RiJavascriptFill } from "react-icons/ri";
import { SiPython } from "react-icons/si";
import { SiPhp } from "react-icons/si";
import { MdOutlineNetworkWifi } from "react-icons/md";
import { CgFigma } from "react-icons/cg";
import { motion } from "framer-motion";

interface SidebarProps {
  showMenu: boolean;
  handleChange: () => void;
}

const Codes: CodeProps[] = [
  {
    id: 1,
    name: "HTML",
    url: "/code/html",
    title: "Hypertext MarkUp Language",
    icon: <ImHtmlFive />,
  },
  {
    id: 2,
    name: "CSS",
    url: "/code/css",
    title: "Cascading Style Sheet",
    icon: <IoLogoCss3 />,
  },
  {
    id: 3,
    name: "JAVASCRIPT",
    url: "/code/javascript",
    title: "JavaScript",
    icon: <RiJavascriptFill />,
  },
  {
    id: 4,
    name: "PYTHON",
    url: "/code/python",
    title: "Python",
    icon: <SiPython />,
  },
  {
    id: 5,
    name: "PHP",
    url: "/code/php",
    title: "PHP: Hypertext Preprocessor",
    icon: <SiPhp />,
  },
  {
    id: 6,
    name: "NETWORKING",
    url: "/code/networking",
    title: "Networking",
    icon: <MdOutlineNetworkWifi />,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ showMenu }) => {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/code" && pathname === "/code") {
      return true;
    }
    return pathname.startsWith(url);
  };

  return (
    <div className="sticky top-28 left-0">
      {showMenu && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/code"
            className={`font-medium ${
              isActive("/code") ? "bg-slate-800" : "bg-slate-700"
            } text-white p-0.5 hidden lg:block rounded text-center py-3 text-lg hover:bg-slate-800 transition-colors`}
          >
            Programming Languages
          </Link>
          <ul className="space-y-2 mt-4">
            {Codes.map((code) => (
              <li
                key={code.id}
                className={`px-4 py-3 rounded hover:shadow-md ring-1 ${
                  isActive(code.url)
                    ? "bg-slate-200 ring-slate-400"
                    : "ring-slate-300 hover:bg-slate-200"
                } transition-colors`}
              >
                <Link
                  href={code.url}
                  className="flex items-center justify-center lg:justify-start"
                >
                  <div className="text-xl md:text-2xl text-gray-900 lg:text-lg lg:mr-2">
                    {code.icon}
                  </div>
                  <span className="hidden text-gray-900 lg:block">
                    {code.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Sidebar;
