"use client";

import {
	LuUserCog,
	LuUsers,
	LuLayoutDashboard,
	LuCalendar,
	LuMessageCircle,
	LuBook,
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
		name: "Records",
		slug: "admin/records",
		icon: LuBook,
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
							className={`hover:text-dark-700 stack h-12 ${isSelected ? "text-dark-700" : "text-dark-100"}`}
						>
							{isSelected && (
								<div className="self-end mx-4 w-24 h-1 rounded-full bg-primary-500" />
							)}

							<div className="flex gap-2 justify-center items-center w-36 h-12 rounded-xl overflow-clip">
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
