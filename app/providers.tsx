"use client";

import { ReactNode } from "react";
import { UserProvider } from "@/contexts/project_context";
// import { DatabaseProvider } from "@/contexts/db_context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    // <DatabaseProvider>
    <UserProvider>{children}</UserProvider>
    // </DatabaseProvider>
  );
}
