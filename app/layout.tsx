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
			<body className={`${font.className} font-medium`}>
				<Providers>
					<main className="h-screen bg-light-300 overflow-clip stack [&_*]:transition-all [&_*]:ease-in [&_*]:transition-duration-75">
						<NavBar />
						<div className="py-16 px-48 w-full h-full stack">{children}</div>
					</main>
				</Providers>
			</body>
		</html>
	);
}
