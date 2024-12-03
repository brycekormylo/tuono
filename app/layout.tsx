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
			<body className={`${font.className}`}>
				<Providers>
					<main className="h-screen bg-gray-100 overflow-clip stack [&_*]:transition-all [&_*]:ease-in [&_*]:transition-duration-75">
						<NavBar />
						<div className="flex py-16 px-56 w-full h-full">{children}</div>
					</main>
				</Providers>
			</body>
		</html>
	);
}
