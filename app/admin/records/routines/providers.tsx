import { RoutineProvider } from "@/contexts/routines";
import { ExerciseProvider } from "@/contexts/exercises";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ExerciseProvider>
			<RoutineProvider>{children}</RoutineProvider>
		</ExerciseProvider>
	);
}
