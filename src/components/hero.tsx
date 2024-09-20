"use client"
import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import Typewriter from "typewriter-effect";

const Hero = () => {
  return (
    <div
      className="h-[60vh] flex items-center justify-center rounded-b-[10rem]"
      style={{
        backgroundImage: `url('/bg/bg1.jpg ')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex flex-col space-y-4 items-center justify-center text-center">
        <h1 className="text-white font-bold text-2xl sm:text-4xl md:text-6xl">
          <Typewriter
            options={{
              strings: [
                "Learn to Code",
                "With DreamerWebDev",
                "At Gradenet ICT",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <h2 className="text-white md:text-2xl">
          With Nigeria&#39;s Largest Web Developer site.
        </h2>
        <div className="flex p-2 w-full items-center justify-center">
          <input
            type="search"
            className="outline-none p-3 w-full md:w-[300px] rounded-l-xl"
            placeholder="Search our Tutorials, e.g.HTML"
          />
          <button className="bg-blue-500 hover:bg-blue-600 outline-none border-0 text-white px-5 py-4 rounded-r-xl text-lg">
            <IoSearchOutline />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero