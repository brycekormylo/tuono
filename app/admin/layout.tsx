import { Providers } from "./providers";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex w-full h-full">
			<Providers>{children}</Providers>
		</section>
	);
}
