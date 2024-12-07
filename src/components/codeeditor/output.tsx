"use client";
import { LANGUAGE_VERSIONS } from "@/lib/constants";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (
  language: keyof typeof LANGUAGE_VERSIONS,
  sourceCode: string
): Promise<{ run: { output: string } }> => {
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

interface OutputProps {
  editorRef: React.RefObject<monaco.editor.IStandaloneCodeEditor>;
  language: keyof typeof LANGUAGE_VERSIONS;
}

const Output: React.FC<OutputProps> = ({ editorRef, language }) => {
  const [output, setOutput] = useState<string | JSX.Element>("");
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (language === "html" && iframeRef.current) {
      iframeRef.current.srcdoc = output as string;
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
      setOutput(
        `Error: ${(error as Error).message || "An unknown error occurred"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-2 min-h-0">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-medium text-gray-900">Output</h2>
        <button
          onClick={runCode}
          className="px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-md transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Running..." : "Run Code"}
        </button>
      </div>
      <div className="flex-1 w-full rounded-lg border border-slate-700 border-solid overflow-auto min-h-0">
        {language === "html" ? (
          <iframe
            ref={iframeRef}
            srcDoc={output as string}
            className="w-full h-full border-none bg-white"
          />
        ) : typeof output === "string" ? (
          <pre className="text-gray-900 p-4 text-sm whitespace-pre-wrap">{output}</pre>
        ) : (
          output
        )}
      </div>
    </div>
  );
};

export default Output;
