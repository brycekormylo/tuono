import {
  useExerciseList,
  ExerciseInfo,
  Difficulty,
  formatEnumValue,
} from "@/contexts/exercise-list";
import { useEffect, useState } from "react";

interface ExerciseRowProps {
  exercise: ExerciseInfo;
}

export default function ExerciseRow({ exercise }: ExerciseRowProps) {
  const { removeExercise, updateExercise, selectedExercise, setSelected } =
    useExerciseList();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    if (selectedExercise) {
      if (selectedExercise.id == exercise.id) {
        setSelected(null);
      } else {
        setSelected(exercise);
      }
    } else {
      setSelected(exercise);
    }
  };

  return (
    <div
      className={`
	grid h-14 bg-transparent ${isExpanded ? "grid-cols-[2fr,1fr,1fr,6rem] bg-gray-400/10" : "grid-cols-[2fr,1fr,1fr,1rem]"}  
	overflow-clip hover:bg-gray-400/20 hover:scale-[1.004] rounded-md items-center 
      `}
    >
      <button
        className="col-start-1 col-end-5 row-span-1 row-start-1 bg-transparent"
        onClick={handleExpand}
      />

      <div className="col-start-1 row-start-1 justify-items-center justify-self-start ps-4">
        <h2 className="text-xl font-medium">{exercise.title}</h2>
      </div>
      <div className="flex flex-wrap col-start-2 row-start-1 gap-2 justify-self-end items-center">
        {exercise.bodyParts?.map((part, index) => (
          <div
            key={index}
            className="flex justify-center items-center py-1 px-3 bg-gray-300 rounded-full"
          >
            <p className="text-sm">{formatEnumValue(part)}</p>
          </div>
        ))}
      </div>
      <div className="flex col-start-3 row-start-1 gap-2 justify-self-end items-center pe-4">
        <p className="">{formatEnumValue(exercise.difficulty)}</p>
        <div
          className={`h-4 w-4 rounded-full ${exercise.difficulty == Difficulty.EASY ? "bg-green-500" : exercise.difficulty == Difficulty.MEDIUM ? "bg-yellow-500" : "bg-red-500"}`}
        />
      </div>
    </div>
  );
}
