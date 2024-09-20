import axios from "axios";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

interface LanguageVersions {
  javascript: string;
  typescript: string;
  python: string;
  java: string;
  csharp: string;
  php: string;
  html: string;
  css: string;
}

export const LANGUAGE_VERSIONS: LanguageVersions = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
  html: "5",
  css: "3",
};

export const executeCode = async (
  language: keyof LanguageVersions,
  sourceCode: string
): Promise<unknown> => {
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};
