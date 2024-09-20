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
];

const CodeBar = () => {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/code" && pathname === "/code") {
      return true;
    }
    return pathname.startsWith(url);
  };

  return (
    <div className="mt-2 bg-indigo-100 h-fit py-2 sm:py-1 z-10">
      <div className="w-[95%] sm:w-[90%] flex flex-wrap md:flex-nowrap gap-y-2 justify-normal sm:justify-start md:w-[80%] space-x-4 xl:w-[70%] h-full mx-auto">
        <Link
          className={`md:font-medium rounded-md text-sm sm:text-md ${
            isActive("/code/") ? "bg-indigo-600" : "bg-indigo-400"
          } text-white hover:bg-indigo-600 px-3 py-1 md:px-5 text-lg lg:text-xl`}
          href="/code/"
        >
          All
        </Link>
        {Codes.map((code) => (
          <Link
            key={code.id}
            className={`md:font-medium text-sm sm:text-md text-white ${
              isActive(code.url) ? "bg-indigo-600" : "bg-indigo-400"
            } hover:bg-indigo-600 px-1 rounded-md py-1 md:px-5 lg:text-lg`}
            href={code.url}
          >
            <span className="hidden md:block">{code.name}</span>
            <span className="text-2xl flex items-center justify-center md:hidden">
              {code.icon}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CodeBar;
