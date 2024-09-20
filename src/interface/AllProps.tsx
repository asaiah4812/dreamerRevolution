export interface CodeProps {
  id: number;
  name: string;
  url: string;
  title: string;
  icon: React.ReactNode;
}

export interface ProgramProps {
  _id: number;
  _createdAt: number;
  name: string;
  fullname: string;
  topics: string[];
  description: string;
  slug: string;
}

export interface RoadProps {
  id: number;
  name: string;
  abt: string;
  desc: string;
  bg: string;
}
//  _createdAt, name, fullname, topics, description, "slug";