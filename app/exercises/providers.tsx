import { ImageUploadProvider } from "@/utils/image-upload";
import { ExerciseProvider } from "@/contexts/exercises";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ImageUploadProvider>
			<ExerciseProvider>{children}</ExerciseProvider>
		</ImageUploadProvider>
	);
}
