import {
  LuUsers,
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
    slug: "patients/patient-list",
    icon: LuUsers,
  },
];

export default function NavBar() {
  return (
    <div className="flex top-0 right-0 flex-row col-start-1 col-end-1 row-start-1 row-end-1 justify-end items-start">
      <div className="flex z-10 flex-col gap-6 items-center pt-6 w-32">
        <Link href={"/account"}>
          <AccountButton />
        </Link>
        {NavbarItems.map((item, index) => {
          return (
            <Link
              key={index}
              className={`${"border-transparent"}`}
              href={`/${item.slug}`}
              scroll={false}
            >
              <div className="flex flex-col gap-2 items-center py-2 px-4 rounded-xl text-md">
                <item.icon className="text-3xl" />
                <p className="uppercase truncate">{item.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
