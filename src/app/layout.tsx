import type { Metadata } from "next";

import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import CodeBar from "@/components/codeBar";
import Footer from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "900"],
});

export const metadat: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export const metadata = {
  icons: {
    icon: "/logo.jpg",
  },
  
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={`bg-stone-100 ${poppins.className}`}>
        <Navbar />
        <div className="mt-[6rem]">
          <CodeBar />
          <main className="mt-[2rem]">{children}</main>
          <Footer/>
        </div>
      </body>
    </html>
  );
}