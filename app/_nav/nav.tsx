"use client";

import {
	LuUserCog,
	LuUsers,
	LuDumbbell,
	LuIterationCw,
	LuLayoutDashboard,
	LuCalendar,
	LuMessageCircle,
} from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";

const NavbarItems = [
	{
		name: "Account",
		slug: "auth",
		icon: LuUserCog,
	},
	{
		name: "Dashboard",
		slug: "intro",
		icon: LuLayoutDashboard,
	},
	{
		name: "Messages",
		slug: "messages",
		icon: LuMessageCircle,
	},
	{
		name: "Schedule",
		slug: "appointments",
		icon: LuCalendar,
	},
	{
		name: "Routines",
		slug: "routines",
		icon: LuIterationCw,
	},
	{
		name: "Exercises",
		slug: "exercises",
		icon: LuDumbbell,
	},
	{
		name: "Patients",
		slug: "patients",
		icon: LuUsers,
	},
];

// TODO Animate bg
export default function NavBar() {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<div className="z-20 flex-col justify-self-start self-start">
			<div className="flex flex-col items-start py-2 w-20 bg-gray-200 rounded-r-lg hover:w-48 group overflow-clip">
				{NavbarItems.map((item, index) => {
					const isSelected = pathname.includes(`/${item.slug}`);
					return (
						<button
							key={item.name}
							type="button"
							onMouseDown={() => router.push(`/${item.slug}`)}
							className={`group/button stack  ${isSelected ? "bg-gray-100 text-black" : "text-gray-600 hover:bg-gray-100/80"} `}
						>
							<div className="justify-self-start self-start w-20 h-2 bg-gray-200 rounded-br-lg group-hover:w-full" />
							<div className="justify-self-start self-end w-20 h-2 bg-gray-200 rounded-tr-lg group-hover:w-full" />
							<div className="flex justify-start items-center w-48 rounded-xl h-[5.5rem] overflow-clip group-hover/button:text-black">
								<div className="w-20 h-20 stack">
									<item.icon size={28} />
								</div>
								<p className="text-base me-6">{item.name}</p>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}
