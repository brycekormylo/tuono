"use client";

import {
  LuUser,
  LuPersonStanding,
  LuDumbbell,
  LuCombine,
  LuLayoutDashboard,
  LuCalendar,
  LuMessageCircle,
} from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";

const NavbarItems = [
  {
    name: "Account",
    slug: "auth",
    icon: LuUser,
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
    name: "Appointments",
    slug: "appointments",
    icon: LuCalendar,
  },
  {
    name: "Routines",
    slug: "routines",
    icon: LuCombine,
  },
  {
    name: "Exercises",
    slug: "exercises",
    icon: LuDumbbell,
  },
  {
    name: "Patients",
    slug: "patients",
    icon: LuPersonStanding,
  },
];

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="absolute pt-8 top-0 right-0 z-20 [&_*]:select-none">
      <div className="flex flex-col gap-8 items-center w-32">
        {NavbarItems.map((item, index) => {
          const isSelected = pathname.includes(`/${item.slug}`);
          return (
            <button
              key={index}
              onMouseDown={() => router.push(`/${item.slug}`)}
              className="w-full h-full stack"
            >
              <div className="flex flex-col w-full min-h-full">
                <div className={`stack ${isSelected ? "block" : "hidden"}`}>
                  <div className="-mt-8 w-full h-8 bg-gray-100 rounded-tl-xl"></div>
                  <div className="-mt-8 w-full h-8 bg-gray-200 rounded-bl-xl"></div>
                </div>
                <div
                  className={`w-full grow transition-none  ${isSelected ? "bg-gray-100" : "bg-transparent"}`}
                />
                <div className={`stack ${isSelected ? "block" : "hidden"}`}>
                  <div className="-mb-8 w-full h-8 bg-gray-100 rounded-bl-xl"></div>
                  <div className="-mb-8 w-full h-8 bg-gray-200 rounded-l-xl"></div>
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center h-24 rounded-xl">
                <item.icon size={28} />
                <p className="uppercase truncate">{item.name}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
