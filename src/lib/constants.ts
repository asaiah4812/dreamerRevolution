// Interface for LANGUAGE_VERSIONS object
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

// Interface for CODE_SNIPPETS object
interface CodeSnippets {
  javascript: string;
  typescript: string;
  python: string;
  java: string;
  csharp: string;
  php: string;
  html: string;
  css: string;
}

// Define the objects using the interfaces
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

export const CODE_SNIPPETS: CodeSnippets = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Asaiah Henson");\n`,
  typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Asaiah Henson" });\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Asaiah")\n`,
  java: `\npublic class HelloGradenet {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello Gradenet");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloGradenet\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello Gradenet in C#");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'Asaiah';\necho $name;\n",
  html: `<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>Hello Gradenet</title>\n</head>\n<body>\n\t<h1>Hello Gradenet</h1>\n\t<p>Welcome to HTML5!</p>\n</body>\n</html>\n`,
  css: `body {\n\tfont-family: Arial, sans-serif;\n\tbackground-color: #f0f0f0;\n\tcolor: #333;\n}\n\nh1 {\n\tcolor: #0066cc;\n\ttext-align: center;\n}\n\np {\n\tmargin: 20px;\n\tline-height: 1.6;\n}\n`,
};
