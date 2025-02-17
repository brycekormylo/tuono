import { Providers } from "./providers";

export default function PatientDetailLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="block w-full h-full">
			<Providers>{children}</Providers>
		</section>
	);
}
