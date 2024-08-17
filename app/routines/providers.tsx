import { ReactNode } from "react";
import { RoutineListProvider } from "@/contexts/routine-list";
import { ExerciseListProvider } from "@/contexts/exercise-list";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ExerciseListProvider>
      <RoutineListProvider>{children}</RoutineListProvider>
    </ExerciseListProvider>
  );
}
