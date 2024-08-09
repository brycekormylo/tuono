import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Providers } from "./providers";
import NavBar from "./_nav/nav";
import "../public/globals.css";

const font = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tuono",
  description: "Customized routines set by professionals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} overflow-x-clip`}>
        <Providers>
          <main className="stack [&_*]:transition-all [&_*]:ease-out [&_*]:transition-duration-75">
            <div className="flex flex-col justify-self-start items-center self-start w-screen">
              <div className="flex justify-start w-full bg-gray-100">
                <div className="pb-12 bg-gray-200 grow me-32 min-h-[52rem] rounded-br-[4rem]">
                  <div className="justify-self-end self-start mt-20 ms-44 me-12">
                    {children}
                  </div>
                </div>
              </div>
              <div className="flex justify-end w-full bg-gray-200">
                <div className="bg-gray-100 min-h-36 grow ms-32 rounded-tl-[4rem]"></div>
              </div>
            </div>
            <NavBar />
          </main>
        </Providers>
      </body>
    </html>
  );
}
