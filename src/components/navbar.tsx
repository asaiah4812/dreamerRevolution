"use client"
import Image from 'next/image';
import logo from '/public/logo.jpg'
import Link from 'next/link';
// import { SiHtml5 } from "react-icons/si";
import { FiMenu } from "react-icons/fi";
import { RiCloseLargeFill } from "react-icons/ri";
import { useState } from 'react';
import { motion } from "framer-motion";

interface LinkProp {
    id: number;
    name:string;
    url: string;
}

const Links = [
    {
        id:1,
        name:'Road map',
        url:'/roadmap/'
    },
    {
        id:2,
        name:'Tutorial',
        url:'/tutorial/'
    },
    {
        id:3,
        name:'Code Editor',
        url:'/code-editor/'
    },
    {
        id:4,
        name:'About',
        url:'/about/'
    },
]

const Navbar:React.FC<LinkProp[]> = () => {
  const [showSide, setShowSide] = useState(false)
  const handleChange = () => {
    setShowSide((prev) => !prev);
  }
  return (
    <nav className="w-full bg-stone-50 py-2 z-40 fixed top-0 left-0 right-0">
      <div className="w-[95%] sm:w-[90%] md:w-[80%] xl:w-[70%] mx-auto flex justify-between">
        <Link href={"/"} className="flex items-center">
          <div className="relative w-20 h-20">
            <Image src={logo} fill={true} alt="logo" />
          </div>
          <div className="flex flex-col space-y-0.5">
            <h1 className="font-medium text-md">DreamerCodeAcademy</h1>
            <span className="text-sm">Gradenet ICT HUB</span>
            <span className="text-xs font-light">dreamer-blog.vercel.app</span>
          </div>
        </Link>
        <div className="lg:flex items-center space-x-3 hidden">
          {Links.map((link) => (
            <Link className="hover:text-blue-700" key={link.id} href={link.url}>
              {link.name}
            </Link>
          ))}
        </div>
        {showSide && (
          <motion.div
          initial={{ x:120, opacity: 0}}
          animate={{ x:0, opacity:1}}
          transition={{ease: 'easeInOut', duration: 0.20}}
          className="flex flex-col fixed top-0 right-0 h-screen px-3 space-y-4 w-[250px] bg-white justify-center">
            <button
              onClick={handleChange}
              className="text-2xl block bg-slate-600 hover:bg-slate-500 text-white w-fit p-2 rounded-full"
            >
              <RiCloseLargeFill />
            </button>
            {Links.map((link) => (
              <Link
                className="hover:text-blue-700 py-2 hover:bg-slate-200 px-1 rounded-md"
                key={link.id}
                href={link.url}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
        <button
          title="Menu Bar"
          onClick={handleChange}
          className="text-2xl block lg:hidden"
        >
          <FiMenu />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;