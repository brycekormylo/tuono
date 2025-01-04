import { Providers } from "./providers";

export default function DashboardLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<section className="w-full h-full stack">
			<Providers>{children}</Providers>
		</section>
	);
}
