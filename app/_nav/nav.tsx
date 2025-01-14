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
			<div className="flex gap-2 justify-center p-2 w-screen bg-none group overflow-clip">
				{navItems.map((item) => {
					const isSelected = pathname.includes(`/${item.slug}`);
					return (
						<button
							key={item.name}
							type="button"
							onMouseDown={() => router.push(`/${item.slug}`)}
							className={`group/button stack ${isSelected ? "text-black" : "text-gray-600 "} `}
						>
							{isSelected && (
								<div className="self-end mx-4 w-28 h-1 bg-gray-500 rounded-full" />
							)}
							<div className="flex gap-2 justify-center items-center w-36 h-12 rounded-xl overflow-clip group-hover/button:text-black">
								<item.icon size={20} />
								<p className="text-base">{item.name}</p>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}
