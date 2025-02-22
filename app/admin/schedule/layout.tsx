import NavBar from "./_components/nav";
import { Providers } from "./providers";

export default function ScheduleLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<section className="flex flex-col items-center w-full h-full">
			<NavBar />
			<Providers>{children}</Providers>
		</section>
	);
}
