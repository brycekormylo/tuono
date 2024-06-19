import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Background from "./(components)/background";
import NavBar from "./(nav)/nav";
import "../public/globals.css";

const font = Inter({ subsets: ["latin"] });

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
      <Providers>
        <body className={font.className}>
          <main className="grid grid-cols-1 grid-rows-1 min-h-screen w-screen">
            <Background />
            <NavBar />
            {children}
          </main>
        </body>
      </Providers>
    </html>
  );
}
