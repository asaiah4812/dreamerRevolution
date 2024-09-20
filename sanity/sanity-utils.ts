import { createClient, groq } from "next-sanity";
import { ProgramProps } from "@/interface/AllProps";

export async function getPrograms() {
  const client = createClient({
    projectId: "l6falefk",

    dataset: "production",

    apiVersion: "2024-09-18",
  });

  return client.fetch(
    groq`*[_type == "program"]{
            _id,

            _createdAt,

            name,

            fullname,

            topics,

            description,

            "slug": slug.current,
        }`
  );
}

export async function getProgram(slug: string): Promise<ProgramProps> {
  const client = createClient({
    projectId: "l6falefk",
    dataset: "production",
    apiVersion: "2024-09-18",
  });

  return client.fetch(
    groq`*[_type == "program" && slug.current == $slug][0]{
      _id,
      _createdAt,
      name,
      fullname,
      topics,
      description,
      "slug": slug.current,
    }`,
    { slug }
  );
}