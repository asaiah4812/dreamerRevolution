import { PortableText } from "@portabletext/react";
import { getProgram } from "../../../../sanity/sanity-utils";
import { ProgramProps as ExternalProgramProps } from "../../../interface/AllProps";

// Define a new interface that extends the external one
interface InternalProgramProps
  extends Omit<ExternalProgramProps, "description"> {
  description: TypedObject | TypedObject[];
}

type TypedObject = {
  _type: string;
  children?: {
    _type: string;
    text: string;
  }[];
};

const stringToPortableText = (text: string): TypedObject[] => [
  {
    _type: "block",
    children: [{ _type: "span", text: text }],
  },
];

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const externalProject = (await getProgram(slug)) as
    | ExternalProgramProps
    | undefined;

  // Convert the external project to our internal format
  const project: InternalProgramProps | undefined = externalProject
    ? {
        ...externalProject,
        description:
          typeof externalProject.description === "string"
            ? stringToPortableText(externalProject.description)
            : externalProject.description,
      }
    : undefined;

  return (
    <div>
      <h1 className="font-bold text-gray-900 text-xl py-2">
        {project
          ? project.fullname
          : "Sorry, we are still working on this page"}
      </h1>
      <div style={{ lineHeight: "2.5", color: "#595959" }}>
        {project?.description ? (
          <PortableText value={project.description} />
        ) : (
          <p className="text-gray-700">
            Sorry, no content available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default SinglePage;
