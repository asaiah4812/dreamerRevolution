"use client"
import { RoadProps } from '@/interface/AllProps';
import React from 'react'
import Typewriter from "typewriter-effect";

const Roads: RoadProps[] = [
  {
    id: 1,
    name: "HTML",
    abt: "The language for building web pages",
    desc: "Learn the structure of web pages, elements, attributes, and basic layout",
    bg: "bg-orange-300",
  },
  {
    id: 2,
    name: "CSS",
    abt: "The language for styling web pages",
    desc: "Understand how to style HTML elements with properties, selectors, and units.",
    bg: "bg-cyan-400",
  },
  {
    id: 3,
    name: "Java Script",
    abt: "The language for programming Interactive web pages",
    desc: "Grasp the basics of JavaScript syntax, variables, data types, operators, and control flow.",
    bg: "bg-sky-400",
  },
];

const RoadMap = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('/bg/bg2.jpg ')`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundAttachment: "fixed",
      }}
      className="sm:rounded-tr-3xl sm:rounded-bl-3xl lg:rounded-tr-full lg:rounded-bl-full py-6"
    >
      <div className="w-[95%] sm:w-[90%] md:w-[80%] xl:w-[70%] mx-auto">
        <h1 className="font-bold text-white text-2xl md:text-4xl xl:text-5xl py-3">
          <Typewriter
            options={{
              strings: [
                "Webdevelopment Learning Road maps",
                "With Step By Step Guide on Best Practices",
                "To Become a Professional Web Developer",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <div>

        <h2 className='font-semibold text-slate-100 text-2xl'>Basic Fundamentals</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 py-5">
          {
            Roads.map(road => (
            <div key={road.id} className={`flex items-center flex-col text-center rounded-md hover:drop-shadow-2xl duration-200 transition-all ease-in-out ${road.bg} justify-center p-5 gap-y-4`}>
              <h2 className='font-semibold text-2xl lg:text-4xl'>{road.name}</h2>
              <span className='font-medium'>{road.abt}</span>
              <p className='text-xs'>{road.desc}</p>
              <button className="bg-slate-800 px-5 py-3 text-white hover:bg-slate-700 rounded-full">
                Learn {road.name}
              </button>
            </div>

            ))
          }
        </div>
       
        </div>
      </div>
    </div>
  );
}

export default RoadMap