import { useExerciseList, ExerciseInfo } from "@/contexts/exercise-list";

interface ExerciseRowProps {
  exercise: ExerciseInfo;
}

export default function ExerciseRow({ exercise }: ExerciseRowProps) {
  return (
    <div className="flex justify-between p-6 gap-24">
      <p>{exercise.name}</p>
      <p>{exercise.bodyParts}</p>
      <p>{exercise.difficulty}</p>
    </div>
  );
}
