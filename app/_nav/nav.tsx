import {
  LuPersonStanding,
  LuDumbbell,
  LuSquareStack,
  LuLayoutDashboard,
} from "react-icons/lu";
import Link from "next/link";
import AccountButton from "./account-button";

const NavbarItems = [
  {
    name: "Dashboard",
    slug: "intro",
    icon: LuLayoutDashboard,
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
  return (
    <div className="absolute top-0 right-0 z-20">
      <div className="flex flex-col gap-8 items-center pt-8 w-32">
        <Link href={"/account"}>
          <AccountButton />
        </Link>
        {NavbarItems.map((item, index) => {
          return (
            <Link key={index} href={`/${item.slug}`} scroll={false}>
              <div className="flex flex-col gap-2 items-center py-2 px-4 rounded-xl hover:scale-[1.04]">
                <item.icon size={32} />
                <p className="uppercase truncate">{item.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
