export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<div className="flex flex-col items-start p-4 w-full">
				<h1 className="px-8 text-4xl">Account Info</h1>
				<div className="flex flex-col justify-start items-center my-12 mx-20">
					{children}
				</div>
			</div>
		</section>
	);
}
