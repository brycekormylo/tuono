import type { ReactNode } from "react";
import { DatabaseProvider } from "@/contexts/database";
import { AuthProvider } from "@/contexts/auth";
import { ProfileProvider } from "@/contexts/profiles";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<DatabaseProvider>
			<AuthProvider>
				<ProfileProvider>{children}</ProfileProvider>
			</AuthProvider>
		</DatabaseProvider>
	);
}
