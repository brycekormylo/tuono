import { ReactNode } from "react";
import { DatabaseProvider } from "@/contexts/database";
import { AuthProvider } from "@/contexts/auth";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <DatabaseProvider>
      <AuthProvider>{children}</AuthProvider>
    </DatabaseProvider>
  );
}
