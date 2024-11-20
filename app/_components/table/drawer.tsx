import { useState, useEffect, ReactNode } from "react";

interface DrawerProps {
  edit: boolean;
  children: ReactNode;
}

export default function Drawer({ edit, children }: DrawerProps) {
  return (
    <div
      style={{ maxWidth: edit ? "61%" : "0rem" }}
      className="flex justify-end w-auto overflow-clip min-h-96"
    >
      {children}
    </div>
  );
}
