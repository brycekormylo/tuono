import { useExerciseList, ExerciseInfo } from "@/contexts/exercise-list";
import { useEffect, useState } from "react";

interface ExerciseRowProps {
  exercise: ExerciseInfo;
}

export default function ExerciseRow({ exercise }: ExerciseRowProps) {
  const { removeExercise, updateExercise, selectedExercise, setSelected } =
    useExerciseList();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (selectedExercise) {
      setIsExpanded(selectedExercise.id == exercise.id);
    } else {
      setIsExpanded(false);
    }
  }, [selectedExercise]);

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
	grid h-14 ${isExpanded ? "grid-cols-[2fr,1fr,1fr,6rem]" : "grid-cols-[2fr,1fr,1fr,1rem]"}  
	${isExpanded ? "bg-gray-400/10" : " bg-transparent"} 
	overflow-clip hover:bg-gray-400/20 hover:scale-y-[1.06] hover:scale-x-[1.004] rounded-md 
	[&_input]:border-b-gray-600/20 [&_input]:border-b-[1px] [&_input]:outline-none 
        [&_input]:bg-transparent [&_input]:focus:scale-[1.02]
        [&_input]:px-1 
      `}
    >
      <button
        className="col-start-1 col-end-5 row-span-1 row-start-1 bg-transparent"
        onClick={handleExpand}
      />

      <div className="col-start-1 row-start-1 justify-items-center justify-self-start ps-4">
        <p className="pt-4">{exercise.title}</p>
      </div>
      <div className="col-start-2 row-start-1 justify-self-end">
        <p className="pt-4">{exercise.bodyParts}</p>
      </div>
      <div className="col-start-3 row-start-1 justify-self-end pe-4">
        <p className="pt-4">{exercise.difficulty}</p>
      </div>
    </div>
  );
}
