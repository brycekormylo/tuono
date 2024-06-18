"use client";

import { ReactNode } from "react";
import { UserProvider } from "@/contexts/project_context";

export function Providers({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
