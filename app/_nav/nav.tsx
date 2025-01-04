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
import { useProfile } from "@/contexts/profiles";

const AdminNavbarItems = [
	{
		name: "Dashboard",
		slug: "admin/dashboard",
		icon: LuLayoutDashboard,
	},
	{
		name: "Messages",
		slug: "admin/messages",
		icon: LuMessageCircle,
	},
	{
		name: "Schedule",
		slug: "admin/schedule",
		icon: LuCalendar,
	},
	{
		name: "Routines",
		slug: "admin/routines",
		icon: LuIterationCw,
	},
	{
		name: "Exercises",
		slug: "admin/exercises",
		icon: LuDumbbell,
	},
	{
		name: "Patients",
		slug: "admin/patients",
		icon: LuUsers,
	},
	{
		name: "Account",
		slug: "auth",
		icon: LuUserCog,
	},
];

const PatientNavbarItems = [
	{
		name: "Dashboard",
		slug: "patient/dashboard",
		icon: LuLayoutDashboard,
	},
	{
		name: "Messages",
		slug: "patient/messages",
		icon: LuMessageCircle,
	},
	{
		name: "Routines",
		slug: "patient/routines",
		icon: LuUsers,
	},
	{
		name: "Records",
		slug: "patient/records",
		icon: LuCalendar,
	},
	{
		name: "Account",
		slug: "auth",
		icon: LuUserCog,
	},
];

export default function NavBar() {
	const pathname = usePathname();
	const router = useRouter();

	const { profile } = useProfile();

	const navItems = profile?.isAdmin ? AdminNavbarItems : PatientNavbarItems;

	return (
		<div className="fixed top-0 z-20">
			<div className="flex items-start px-2 bg-gray-200 rounded-b-lg group overflow-clip">
				{navItems.map((item) => {
					const isSelected = pathname.includes(`/${item.slug}`);
					return (
						<button
							key={item.name}
							type="button"
							onMouseDown={() => router.push(`/${item.slug}`)}
							className={`group/button stack  ${isSelected ? "bg-gray-100 text-black" : "text-gray-600 hover:bg-gray-100/80"} `}
						>
							<div className="justify-self-start w-4 h-full bg-gray-200 rounded-b-xl -ms-2" />
							<div className="justify-self-end w-4 h-full bg-gray-200 rounded-b-xl -me-2" />
							<div className="flex justify-center items-center w-48 h-14 rounded-xl overflow-clip group-hover/button:text-black">
								<div className="w-12 h-12 stack">
									<item.icon size={20} />
								</div>
								<p className="text-base me-4">{item.name}</p>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}
