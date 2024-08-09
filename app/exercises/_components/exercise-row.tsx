"use client";

import {
  useExerciseList,
  ExerciseInfo,
  Difficulty,
  formatEnumValue,
} from "@/contexts/exercise-list";
import { useEffect, useState, useMemo } from "react";
import { LuTrash2, LuPencil, LuEye, LuCheck, LuUndo } from "react-icons/lu";
import Link from "next/link";

interface ExerciseRowProps {
  exercise: ExerciseInfo;
}

export default function ExerciseRow({ exercise }: ExerciseRowProps) {
  const { removeExercise, selectedExercise, setSelected } = useExerciseList();
  const [isExpanded, setIsExpanded] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const ids = useMemo(() => {
    return { selected: selectedExercise?.id, current: exercise.id };
  }, [selectedExercise?.id, exercise.id]);

  useEffect(() => {
    setIsExpanded(ids.current == ids.selected);
  }, [selectedExercise, ids]);

  useEffect(() => {
    setDeleteMode(false);
  }, [isExpanded]);

  const handleClick = () => {
    if (selectedExercise?.id == exercise.id) {
      setSelected(null);
    } else {
      setSelected(exercise);
    }
  };

  const handleDelete = () => {
    const selected = selectedExercise;
    setSelected(null);
    selected && removeExercise(selected);
  };

  return (
    <div
      className={`
	grid h-14 ${isExpanded ? "grid-cols-[1fr,1fr,20rem,10rem] bg-gray-400/10 scale-[1.004]" : "grid-cols-[1fr,1fr,30rem,0rem] bg-transparent"}  
	overflow-clip hover:bg-gray-400/15 hover:scale-[1.004] rounded-md items-center 
      `}
    >
      <div className="col-start-1 row-start-1 justify-items-center justify-self-start ps-4">
        <h2 className="text-lg font-medium select-none">{exercise.title}</h2>
      </div>
      <div className="flex flex-wrap col-start-2 row-start-1 gap-2 justify-self-end items-center">
        {exercise.bodyParts?.map((part, index) => (
          <div
            key={index}
            className="flex justify-center items-center py-1 px-3 bg-gray-300 rounded-full"
          >
            <p className="text-sm select-none">{formatEnumValue(part)}</p>
          </div>
        ))}
      </div>
      <div className="flex col-start-3 row-start-1 gap-2 justify-self-end items-center pe-4">
        <p className="text-sm select-none">
          {formatEnumValue(exercise.difficulty)}
        </p>
        <div
          className={`h-4 w-4 rounded-full ${exercise.difficulty == Difficulty.EASY ? "bg-green-500" : exercise.difficulty == Difficulty.MEDIUM ? "bg-yellow-500" : "bg-red-500"}`}
        />
      </div>
      <button
        className="col-start-1 col-end-4 row-start-1 w-full h-full bg-transparent"
        onMouseDown={handleClick}
      />
      {isExpanded && (
        <div className="flex z-20 justify-evenly items-center h-full bg-gray-200 rounded-md">
          {deleteMode ? (
            <>
              <button onClick={() => setDeleteMode(false)}>
                <LuUndo size={24} />
              </button>
              <div>
                <label className="text-sm text-wrap">Delete?</label>
              </div>
              <button onClick={handleDelete} className="text-red-500">
                <LuTrash2 size={24} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setDeleteMode(true)}
                className="text-red-500"
              >
                <LuTrash2 size={24} />
              </button>
              <Link href={"/exercises/exercise-editor"} className="">
                <LuPencil size={24} />
              </Link>
              <Link href={"/exercises/exercise-preview"} className="">
                <LuEye size={24} />
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
