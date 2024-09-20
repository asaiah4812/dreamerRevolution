import Language from "@/components/language";
import Hero from "@/components/hero";


export default function Home() {
  return (
    <div className="w-full">
      <div>
        <Hero />
      </div>
      <div className="mt-6">
        <Language
          language="HTML"
          rounded="rounded-tr-3xl"
          bg="bg-green-200"
          code={`
<!DOCTYPE html>
  <html>
  <head>
    <title>HTML Tutorial</title>
  </head>
  <body>
    <h1>This is a heading</h1>
    <p>This is a paragraph.</p>
  </body>
  </html>
          `}
          prolang="html"
        />
        <Language
          language="CSS"
          rounded="rounded-tl-full"
          bg="bg-amber-100"
          code={`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
          `}
          prolang="css"
        />
        <Language
          language="JavaScript"
          rounded="rounded-tl-full"
          bg="bg-rose-100"
          code={`
let name = document.querySelect('h1')
name.innerHTML = "Asaiah Henson"
            `}
          prolang="javascript"
        />
        <Language
          language="Python"
          rounded="rounded-tl-full"
          bg="bg-purple-200"
          code={`
username = input('what is your name: ')
print(username)
name = "Asaiah Henson"
print(name)
            `}
          prolang="python"
        />
      </div>
    </div>
  );
}
