import { createClient, groq } from 'next-sanity';

const client = createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  apiVersion: '2024-03-07',
  useCdn: true,
});

export async function getPrograms() {
  return client.fetch(
    groq`*[_type == "program"]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      url,
      content
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