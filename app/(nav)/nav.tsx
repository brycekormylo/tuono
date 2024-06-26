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
    <div className="flex top-0 right-0 flex-row col-start-1 col-end-1 row-start-1 row-end-1 justify-end items-start">
      <div className="flex z-10 flex-col gap-4 items-center w-32">
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
