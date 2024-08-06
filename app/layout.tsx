import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Providers } from "./providers";
import Background from "./_components/background";
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
      <body className={font.className}>
        <Providers>
          <main className="stack">
            <Background />
            <NavBar />
            <div className="[&_*]:transition-all justify-self-end self-start me-48 mt-20">
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
