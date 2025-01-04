import { PatientProvider } from "@/contexts/patients";
import { ProfileProvider } from "@/contexts/profiles";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ProfileProvider>
			<PatientProvider>{children}</PatientProvider>
		</ProfileProvider>
	);
}
