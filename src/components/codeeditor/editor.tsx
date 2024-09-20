"use client"
import React, { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./languageSelector";
import { CODE_SNIPPETS } from "@/lib/constants";
import Output from "./output";

const MyEditor: React.FC = () => {
  const editorRef = useRef(null);
  const [value, setValue] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");

  const onMount = (editor: null) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language: string) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language as keyof typeof CODE_SNIPPETS]);
  };

  return (
    <div className="bg-slate-50 flex flex-col md:flex-row">
      <div className="flex flex-col flex-1">
        {" "}
        {/* Stack on small screens, row on medium and above */}
        <div className="p-2">
          {" "}
          {/* Full width on small screens, half width on medium and above */}
          <LanguageSelector language={language} onSelect={onSelect} />
        </div>
        <div className="h-[70vh] md:h-[90vh] p-2">
          {" "}
          {/* Full width on small screens, half width on medium and above */}
          <Editor
            height="100%" // Adjust height as needed
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