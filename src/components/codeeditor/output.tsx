"use client";
import { LANGUAGE_VERSIONS } from "@/lib/constants";
import axios from "axios";
import { useState, useRef, useEffect } from "react";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (
  language: keyof typeof LANGUAGE_VERSIONS,
  sourceCode: string
): Promise<unknown> => {
  if (language === "html" || language === "css") {
    return {
      run: {
        output: sourceCode,
      },
    };
  }

  try {
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
  } catch (error) {
    console.error("Error executing code:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API Error: ${error.response?.data?.message || error.message}`
      );
    }
    throw error;
  }
};

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (language === "html" && iframeRef.current) {
      iframeRef.current.srcdoc = output;
    }
  }, [output, language]);

  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;

    setIsLoading(true);
    setOutput("Running code...");

    try {
      const result = await executeCode(language, sourceCode);
      if (result.run && result.run.output) {
        if (language === "html") {
          setOutput(result.run.output);
        } else if (language === "css") {
          setOutput(
            <div>
              <style>{result.run.output}</style>
              <p>CSS applied to this div</p>
            </div>
          );
        } else {
          setOutput(result.run.output);
        }
      } else {
        setOutput("No output received from the API.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setOutput(`Error: ${error.message || "An unknown error occurred"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-2">
      <div className="flex items-center justify-between">
        <h2 className="py-3 font-medium">Output</h2>
        <button
          onClick={runCode}
          className="py-3 px-4 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
          disabled={isLoading}
        >
          {isLoading ? "Running..." : "Run Code"}
        </button>
      </div>
      <div className="w-full h-[90vh] p-2 rounded-lg mt-2 border border-slate-700 border-solid overflow-auto">
        {language === "html" ? (
          <iframe
            ref={iframeRef}
            srcDoc={output}
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        ) : typeof output === "string" ? (
          <pre>{output}</pre>
        ) : (
          output
        )}
      </div>
    </div>
  );
};

export default Output;