import { Providers } from "./providers";

export default function PatientLayout({
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
