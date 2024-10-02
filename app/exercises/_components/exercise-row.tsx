"use client";

import {
  useExerciseList,
  ExerciseInfo,
  Difficulty,
  formatEnumValue,
} from "@/contexts/exercise-list";
import { useEffect, useState } from "react";
import { LuTrash2, LuPencil, LuEye, LuUndo } from "react-icons/lu";
import Link from "next/link";

interface ExerciseRowProps {
  exercise: ExerciseInfo;
}

export default function ExerciseRow({ exercise }: ExerciseRowProps) {
  const { edit, setEdit, remove, selected, setSelected } = useExerciseList();
  const [isExpanded, setIsExpanded] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    selected && setIsExpanded(selected.id == exercise.id);
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setDeleteMode(false);
  }, [isExpanded]);

  const handleClick = () => {
    if (selected?.id == exercise.id) {
      setSelected(null);
      setIsExpanded(false);
      setEdit(false);
    } else {
      setSelected(exercise);
    }
  };

  const handleDelete = () => {
    setDeleteMode(false);
    const toDelete = selected;
    setSelected(null);
    toDelete && remove(toDelete);
  };

  const handleEdit = () => {
    setEdit(true);
    setSelected(exercise);
    setIsExpanded(false);
  };

  return (
    <div className="w-full h-14 stack">
      <div className="flex z-10 w-full">
        <div className="grid group h-14 w-full rounded-md overflow-clip bg-transparent grid-cols-[1fr,2fr,1.5fr] items-center">
          <div
            className={`flex col-start-1 row-start-1 justify-self-start items-center w-full h-full group-hover:bg-gray-200 ps-4 ${isExpanded ? "bg-gray-100" : "bg-gray-50"}`}
          >
            <h2 className="text-lg font-medium select-none">
              {exercise.title}
            </h2>
          </div>
          <div
            className={`flex flex-wrap col-start-2 row-start-1 gap-2 justify-end pe-2 items-center w-full h-full  group-hover:bg-gray-200 ${isExpanded ? "bg-gray-100" : "bg-gray-50"}`}
          >
            {exercise.bodyParts?.map((part, index) => (
              <div
                key={index}
                className="flex justify-center items-center py-1 px-3 rounded-md ring-gray-300 ring-[1px]"
              >
                <p className="text-sm select-none">{formatEnumValue(part)}</p>
              </div>
            ))}
          </div>
          <div
            className={`${isExpanded && !edit ? " pe-[10rem]" : ""} flex col-start-3 row-start-1 gap-2 justify-end  w-full h-full justify-items-end items-center min-w-40`}
          >
            <div
              className={`flex gap-2 justify-end items-center w-full h-full group-hover:bg-gray-200 pe-4 ${isExpanded ? "bg-gray-100" : "bg-gray-50"}`}
            >
              <p className="text-sm select-none">
                {formatEnumValue(exercise.difficulty)}
              </p>
              <div
                className={`h-4 w-4 rounded-full ${exercise.difficulty == Difficulty.EASY ? "bg-green-500" : exercise.difficulty == Difficulty.MEDIUM ? "bg-yellow-500" : "bg-red-500"}`}
              />
            </div>
          </div>
          <button
            className={`${isExpanded ? "me-[10rem]" : ""} col-start-1 col-end-4 row-start-1 h-full grow bg-transparent`}
            onMouseDown={handleClick}
          />
        </div>
      </div>

      <div
        className={`${isExpanded && !edit ? "z-10" : "z-0"} flex justify-evenly justify-self-end items-center h-full rounded-r-md bg-gray-300/75 min-w-[10rem]`}
      >
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
            <button onClick={handleEdit} className="">
              <LuPencil size={24} />
            </button>
            <Link href={"/exercises"} className="">
              <LuEye size={24} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
