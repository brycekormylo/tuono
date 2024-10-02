import { ReactNode } from "react";
import { ExerciseListProvider } from "@/contexts/exercise-list";
import { ImageUploadProvider } from "@/utils/image-upload";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ImageUploadProvider>
      <ExerciseListProvider>{children}</ExerciseListProvider>
    </ImageUploadProvider>
  );
}
