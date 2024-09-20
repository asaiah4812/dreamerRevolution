import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeExampleProps {
  code: string;
  language: string;
}

const CodeExample: React.FC<CodeExampleProps> = ({ code, language }) => {
  return (
    <div className="my-4 rounded-lg overflow-hidden">
      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        customStyle={{
          padding: "1rem",
          fontSize: "0.875rem",
          lineHeight: "1.5",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeExample;
