import { PatientConversationProvider } from "@/contexts/patient-conversations";
import { PatientProvider } from "@/contexts/patients";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<PatientProvider>
			<PatientConversationProvider>{children}</PatientConversationProvider>
		</PatientProvider>
	);
}
