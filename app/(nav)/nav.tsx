"use client";

import { LuHome, LuUser2, LuSquareStack, LuLink2 } from "react-icons/lu";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AccountButton from "./account-button";

const NavbarItems = [
  {
    name: "Routines",
    slug: "/",
    icon: LuHome,
  },
  {
    name: "Clients",
    slug: "clients",
    icon: LuUser2,
  },
  {
    name: "Messages",
    slug: "messages",
    icon: LuSquareStack,
  },
];

export default function NavBar() {
  const [tooltipVisibility, setTooltipVisibility] = useState([
    false,
    false,
    false,
  ]);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleTooltipVisibility = (index: number, isVisible: boolean) => {
    setTooltipVisibility((prev) => {
      const temp = [...prev];
      temp[index] = isVisible;
      return temp;
    });
  };

  return (
    <div className="col-start-1 col-end-1 row-start-1 row-end-1 top-0 right-0 flex flex-row items-start justify-end">
      <div className="flex flex-col gap-4 z-10 w-32 items-center">
        <Link href={"/account"}>
          <AccountButton />
        </Link>
        {NavbarItems.map((item, index) => {
          return (
            <Link
              key={index}
              className={`${
                activeSection === item.slug
                  ? "border-myrtle bg-space-gray"
                  : "border-transparent"
              }`}
              onMouseLeave={() => handleTooltipVisibility(index, false)}
              onMouseEnter={() => handleTooltipVisibility(index, true)}
              href={`/${item.slug}`}
              scroll={false}
            >
              <div className="text-md rounded-xl px-4 py-2">
                <p className="truncate uppercase">{item.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
