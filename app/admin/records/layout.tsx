import NavBar from "./_components/nav";

export default function RecordLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col w-full h-full">
			<NavBar />
			{children}
		</section>
	);
}
