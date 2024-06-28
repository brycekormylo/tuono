import { LuHome, LuUser2, LuSquareStack, LuLink2 } from "react-icons/lu";
import Link from "next/link";
import AccountButton from "./account-button";

const NavbarItems = [
  {
    name: "Dashboard",
    slug: "/",
    icon: LuHome,
  },
  {
    name: "Records",
    slug: "record-editor",
    icon: LuUser2,
  },
  {
    name: "Clients",
    slug: "client-list",
    icon: LuSquareStack,
  },
];

export default function NavBar() {
  return (
    <div className="flex top-0 right-0 flex-row col-start-1 col-end-1 row-start-1 row-end-1 justify-end items-start">
      <div className="flex z-10 flex-col gap-4 items-center w-32">
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
              <div className="py-2 px-4 rounded-xl text-md">
                <p className="uppercase truncate">{item.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
