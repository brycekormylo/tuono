"use client";

import { LuUserCog, LuIterationCw, LuCalendar } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";

const TableItems = [
	{
		name: "Patients",
		slug: "admin/records/patients",
		icon: LuUserCog,
	},
	{
		name: "Exercises",
		slug: "admin/records/exercises",
		icon: LuCalendar,
	},

	{
		name: "Routines",
		slug: "admin/records/routines",
		icon: LuIterationCw,
	},
];

export default function NavBar() {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<div className="fixed left-0 top-14 z-0 ms-60">
			<div className="flex gap-8 justify-start items-center p-2 w-screen bg-none group overflow-clip">
				{TableItems.map((item) => {
					const isSelected = pathname.includes(`/${item.slug}`);
					return (
						<button
							key={item.name}
							type="button"
							onMouseDown={() => router.push(`/${item.slug}`)}
							className={`group/button h-14 stack ${isSelected ? "text-dark-700" : "text-dark-100"} `}
						>
							{isSelected && (
								<div className="self-end mx-4 w-28 h-1 rounded-full bg-primary-500" />
							)}
							<div className="flex gap-2 justify-center items-center rounded-xl min-w-36 overflow-clip group-hover/button:text-dark-700">
								<p className="text-3xl">{item.name}</p>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}
