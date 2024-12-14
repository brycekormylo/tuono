import { ProfileProvider } from "@/contexts/profiles";

export function Providers({ children }: { children: React.ReactNode }) {
	return <ProfileProvider>{children}</ProfileProvider>;
}
