export default function PatientLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section className="flex w-full h-full">{children}</section>;
}
