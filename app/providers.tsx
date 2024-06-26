import { ReactNode } from "react";
import { UserProvider } from "@/contexts/project-context";
import { DatabaseProvider } from "@/contexts/database";
import { AuthProvider } from "@/contexts/auth";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <UserProvider>{children}</UserProvider>
      </DatabaseProvider>
    </AuthProvider>
  );
}
