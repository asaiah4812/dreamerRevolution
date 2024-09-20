"use client";
import React, { useRef, useState } from "react";
import { Editor, OnMount } from "@monaco-editor/react";
import LanguageSelector from "./languageSelector";
import { CODE_SNIPPETS } from "@/lib/constants";
import Output from "./output";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

export type SupportedLanguage = keyof typeof CODE_SNIPPETS;

const MyEditor: React.FC = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [value, setValue] = useState<string>("");
  const [language, setLanguage] = useState<SupportedLanguage>("javascript");

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

  return (
    <div className="bg-slate-50 flex flex-col md:flex-row">
      <div className="flex flex-col flex-1">
        <div className="p-2">
          <LanguageSelector language={language} onSelect={onSelect} />
        </div>
        <div className="h-[70vh] md:h-[90vh] p-2">
          <Editor
            height="100%"
            theme="vs-dark"
            value={value}
            language={language}
            defaultLanguage="javascript"
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            onChange={(value) => setValue(value || "")}
          />
        </div>
      </div>
      <div className="flex-1">
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>
  );
};

export default MyEditor;
