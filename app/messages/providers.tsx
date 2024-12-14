import { ConversationProvider } from "@/contexts/conversations";
import { PatientProvider } from "@/contexts/patients";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<PatientProvider>
			<ConversationProvider>{children}</ConversationProvider>
		</PatientProvider>
	);
}
