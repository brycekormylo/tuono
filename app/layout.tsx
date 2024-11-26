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
          <main className="[&_*]:transition-all [&_*]:ease-in [&_*]:transition-duration-75">
            <div className="flex flex-col justify-self-start items-center self-start w-screen h-screen overflow-clip">
              <div className="w-full h-full stack">
                <div className="flex w-full h-full bg-gray-200">
                  <NavBar />
                  <div className="pb-12 h-full bg-gray-100 grow rounded-bl-[4rem]" />
                </div>
                <div className="flex w-full h-full">
                  <div className="mx-64 mt-24 h-full grow min-h-96">
                    {children}
                  </div>
                </div>
              </div>

              <div className="flex justify-end w-full bg-gray-100">
                <div className="bg-gray-200 min-h-36 grow me-32 rounded-tr-[4rem]"></div>
              </div>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
