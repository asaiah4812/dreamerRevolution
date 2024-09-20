import { ProgramProps } from "@/interface/AllProps"
import { getPrograms } from "../../../sanity/sanity-utils"
import Link from "next/link";

interface ResProps {
  id:number;
  point: string;
}

interface IntrProps {
  id: number;
  title: string;
  focus: string;
  skill: string;
  responsibilities: ResProps[];
}

const Intros:IntrProps[] = [
  {
    id: 1,
    title: "Web Design",
    focus:
      "Web design is concerned with the visual appearance, user experience (UX), and layout of a website. Designers focus on how the website looks and feels to users.",
    skill:
      "Web designers use tools like Adobe XD, Figma, or Sketch to create layouts, color schemes, typography, and UI elements. They may have knowledge of HTML and CSS to ensure their designs can be implemented correctly, but their primary role is on the front-end appearance.",
    responsibilities: [
      {
        id: 1,
        point: "Creating wireframes and mockups",
      },
      {
        id: 2,
        point: "Designing navigation flows",
      },
      {
        id: 3,
        point: "Ensuring responsive design for mobile and desktop views",
      },
      {
        id: 4,
        point:
          "Designing user interfaces (UI) and optimizing user experiences (UX)",
      },
    ],
  },
  {
    id: 2,
    title: "Web Development",
    focus:
      "Web development is about building and maintaining the functional side of a website. Developers focus on coding the website, ensuring that it works smoothly and efficiently.",
    skill:
      "Web developers use languages like HTML, CSS, JavaScript (for the front end), and server-side languages like Python, Ruby, or PHP for the back end. They also work with databases and frameworks like React, Django, or Laravel.",
    responsibilities: [
      {
        id: 1,
        point: "Writing the code that powers websites and web applications",
      },
      {
        id: 2,
        point: "Ensuring functionality, performance, and security",
      },
      {
        id: 3,
        point:
          "Building features like forms, databases, and content management systems (CMS)",
      },
      {
        id: 4,
        point:
          "Testing and debugging",
      },
    ],
  },
];


const CodeHome = async () => {

  const program:ProgramProps[] = await getPrograms()
  return (
    <div>
      <h1 className="font-bold text-md sm:text-xl lg:text-2xl">
        Intoduction to Webdevelopment
      </h1>
      <div>
        {Intros.map((intro) => (
          <div key={intro.id} className="mt-3">
            <h2
              className="text-slate-600 text-xl md:text-xl sm:font-medium py-2 md:font-semibold"
            >
              {intro.title}
            </h2>
            <div className="space-y-3">
              <ul className="space-y-3 pl-4">
                <li className="list-disc">
                  <span className="font-medium tracking-widest">Focus: </span>
                  <small className="text-sm sm:text-md">{intro.focus}</small>
                </li>
                <li className="list-disc">
                  <span className="font-medium tracking-widest">Skills: </span>
                  <small className="text-sm sm:text-md">{intro.skill}</small>
                </li>
                <li className="list-disc">
                  <span className="font-medium tracking-widest">
                    Responsibilities:{" "}
                  </span>
                  <ul className="space-y-3">
                    {intro.responsibilities.map((res) => (
                      <li className="list- ml-2" key={res.id}>{res.point}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h1 className="font-medium md:text-lg">Learning plan</h1>
        <div className="flex flex-col mt-2 space-y-3">
          {
            program.map(pro => (
              <Link href={`/code/${pro.slug}`} className="hover:underline" key={pro._id}>{pro.name}</Link>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default CodeHome