"use client"
import Sidebar from "@/components/code/sidebar";
import { useState } from "react";
import { motion } from "framer-motion";
import { RiMenuUnfold3Fill } from "react-icons/ri";
import { MdOutlineMenuOpen } from "react-icons/md";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const handleChange = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <section className="w-[95%] sm:w-[90%] md:w-[80%] xl:w-[70%] mx-auto">
      <main className="grid grid-cols-5 gap-3">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`${showMenu ? "col-span-1" : "col-start-1"} relative overflow-x-hidden-hidden px-1`}
        >
          <Sidebar showMenu={showMenu} handleChange={handleChange} /> {/* Pass handleChange as a prop */}
          <button
            title="Menu toggle"
            onClick={handleChange}
            className="absolute -top-8 left-0 bg-indigo-600 p-2 rounded text-white"
          >
            {!showMenu ? <RiMenuUnfold3Fill /> : <MdOutlineMenuOpen />}
          </button>
        </motion.div>
        <motion.div
          transition={{ transition: 1.4 }}
          className={`${showMenu ? "col-span-4" : "col-span-5"} transition-all duration-700 ease-in-out bg-slate-200 p-4`}
        >
          {children}
        </motion.div>
      </main>
    </section>
  );
}