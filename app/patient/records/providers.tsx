import { ExerciseProvider } from "@/contexts/exercises";
import { PatientProvider } from "@/contexts/patients";
import { RoutineProvider } from "@/contexts/routines";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ExerciseProvider>
			<RoutineProvider>
				<PatientProvider>{children}</PatientProvider>
			</RoutineProvider>
		</ExerciseProvider>
	);
}
