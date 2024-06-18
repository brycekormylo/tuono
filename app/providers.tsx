"use client";

import { ReactNode } from "react";
import { UserProvider } from "@/contexts/project-context";
// import { DatabaseProvider } from "@/contexts/db-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    // <DatabaseProvider>
    <UserProvider>{children}</UserProvider>
    // </DatabaseProvider>
  );
}
