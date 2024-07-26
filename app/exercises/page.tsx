"use client";

import { useExerciseList, ExerciseInfo } from "@/contexts/exercise-list";
import ExerciseRow from "./_components/exercise-row";

export default function Exercises() {
  const { exercises } = useExerciseList();

  return (
    <div className="flex gap-8 w-full">
      <div className="flex flex-col">
        {exercises?.map((exercise, index) => (
          <div key={index}>
            <ExerciseRow exercise={exercise} />
          </div>
        ))}
      </div>
    </div>
  );
}
