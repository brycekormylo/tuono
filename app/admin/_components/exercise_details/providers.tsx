import { ConversationProvider } from "@/contexts/conversations";
import { ExerciseProvider } from "@/contexts/exercises";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ExerciseProvider>
			<ConversationProvider>{children}</ConversationProvider>
		</ExerciseProvider>
	);
}
