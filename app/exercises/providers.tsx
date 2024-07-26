import { ReactNode } from "react";
import { ExerciseListProvider } from "@/contexts/exercise-list";

export function Providers({ children }: { children: ReactNode }) {
  return <ExerciseListProvider>{children}</ExerciseListProvider>;
}
