"use client";

import { usePathname, useRouter } from "next/navigation";

const TableItems = [
	{
		name: "Day",
		slug: "admin/schedule/day",
	},
	{
		name: "Week",
		slug: "admin/schedule/week",
	},

	{
		name: "Month",
		slug: "admin/schedule/month",
	},
];

export default function NavBar() {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<div className="fixed left-0 top-16 z-0 ms-60">
			<div className="flex gap-8 justify-start p-2 w-screen bg-none group overflow-clip">
				{TableItems.map((item) => {
					const isSelected = pathname.includes(`/${item.slug}`);
					return (
						<button
							key={item.name}
							type="button"
							onMouseDown={() => router.push(`/${item.slug}`)}
							className={`group/button stack ${isSelected ? "text-black" : "text-gray-500"} `}
						>
							{isSelected && (
								<div className="self-end mx-4 w-28 h-1 bg-gray-500 rounded-full" />
							)}

							<div className="flex gap-2 justify-center items-center h-16 rounded-xl min-w-36 overflow-clip group-hover/button:text-black">
								<p className="text-3xl">{item.name}</p>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}
