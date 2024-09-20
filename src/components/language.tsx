import React from "react";
import CodeExample from "./codeExample";
import Link from "next/link";

interface CodeProps {
  language: string;
  rounded: string;
  bg: string;
  code: string;
  prolang: string;
}

const Language = ({ language, rounded, bg, code, prolang }: CodeProps) => {
  const htmlExample = `
${code}
  `;
  return (
    <div className={`${bg} lg:${rounded} py-5 min-h-[45vh] flex items-center`}>
      <div className="flex justify-around w-[95%] sm:w-[90%] md:w-[80%] xl:w-[70%] gap-y-5 flex-wrap md:flex-nowrap mx-auto">
        <div className="flex justify-center items-center space-y-3 flex-col text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 font-bold">
            {language}
          </h1>
          <span className="text-gray-900">
            The Language for building web pages
          </span>
          <div className="space-y-3 flex flex-col">
            <button className="px-5 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white">
              Learn {language}
            </button>
            <button className="px-5 py-2 rounded-full bg-amber-400 hover:bg-amber-500 text-white">
              Video Tutorial
            </button>
            <button className="px-5 py-2 rounded-full bg-slate-600 hover:bg-slate-700 text-white">
              HTML Reference
            </button>
            <button className="px-5 py-2 rounded-full bg-pink-300 hover:bg-pink-400 text-white">
              Get Certified
            </button>
          </div>
        </div>
        <div className="py-2 px-1 shadow-md min-w-[300px] bg-slate-300 rounded-md">
          <code className="w-full">
            <CodeExample code={htmlExample} language={`${prolang}`} />
          </code>
          <Link
            href={"/code-editor/"}
            className="py-1 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
          >
            Try it
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Language;
