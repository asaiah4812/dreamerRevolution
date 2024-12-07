"use client";
import React, { useRef, useState, useEffect } from "react";
import { Editor, OnMount } from "@monaco-editor/react";
import LanguageSelector from "./languageSelector";
import { CODE_SNIPPETS } from "@/lib/constants";
import Output from "./output";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { supabase } from "@/utils/supabaseClient";
import { Toaster, toast } from "sonner";
import Link from "next/link";

export type SupportedLanguage = keyof typeof CODE_SNIPPETS;

interface EditorProps {
  initialValue?: string;
  initialLanguage?: string;
  projectId?: string;
  projectName?: string;
}

const MyEditor: React.FC<EditorProps> = ({
  initialValue = "",
  initialLanguage = "javascript",
  projectId,
  projectName: initialProjectName = "",
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [value, setValue] = useState<string>(initialValue);
  const [language, setLanguage] = useState<SupportedLanguage>(
    initialLanguage as SupportedLanguage
  );
  const [projectName, setProjectName] = useState<string>(initialProjectName);
  const [user, setUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser({ id: session.user.id });
      } else {
        setUser(null);
      }
    };
    checkSession();
  }, []);

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (selectedLanguage: string) => {
    if (selectedLanguage in CODE_SNIPPETS) {
      setLanguage(selectedLanguage as SupportedLanguage);
      setValue(CODE_SNIPPETS[selectedLanguage as SupportedLanguage]);
    }
  };

  const saveProject = async () => {
    if (!user) {
      toast.error("Please login to save projects");
      return;
    }

    if (!projectName.trim()) {
      toast.error("Please enter a project name");
      return;
    }

    try {
      if (projectId) {
        const { error } = await supabase
          .from("projects")
          .update({
            name: projectName,
            language: language,
            code: value,
          })
          .eq("id", projectId);

        if (error) throw error;
        toast.success("Project updated successfully!");
      } else {
        const { error } = await supabase.from("projects").insert({
          user_id: user.id,
          name: projectName,
          language: language,
          code: value,
        });

        if (error) throw error;
        toast.success("Project saved successfully!");
      }
    } catch (error) {
      toast.error(`Failed to save project: ${(error as Error).message}`);
    }
  };

  return (
    <div className="bg-slate-50 h-screen flex flex-col">
      {user && (
        <div className="w-full p-2 md:p-4 bg-white border-b flex flex-col sm:flex-row gap-2">
          <Link
            href="/projects"
            className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors flex items-center gap-2 w-fit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            My Projects
          </Link>
          <div className="flex flex-col sm:flex-row sm:ml-auto items-stretch sm:items-center gap-2">
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="px-3 py-2 border rounded-md w-full sm:w-64"
            />
            <button
              onClick={saveProject}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
            >
              Save Project
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        <div className="flex flex-col h-[50vh] lg:h-auto lg:flex-1 min-h-0">
          <div className="p-2">
            <LanguageSelector language={language} onSelect={onSelect} />
          </div>
          <div className="flex-1 p-2 min-h-0">
            <Editor
              height="100%"
              theme="vs-dark"
              value={value}
              language={language}
              defaultLanguage="javascript"
              defaultValue={CODE_SNIPPETS[language]}
              onMount={onMount}
              onChange={(value) => setValue(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                scrollbar: {
                  vertical: 'visible',
                  horizontal: 'visible',
                  verticalScrollbarSize: 10,
                  horizontalScrollbarSize: 10
                }
              }}
            />
          </div>
        </div>
        <div className="h-[50vh] lg:h-auto lg:w-1/2 border-t lg:border-t-0 lg:border-l border-gray-200 min-h-0">
          <Output editorRef={editorRef} language={language} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default MyEditor;
