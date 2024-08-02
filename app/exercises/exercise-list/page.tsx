"use client";

import { useExerciseList, ExerciseInfo } from "@/contexts/exercise-list";
import ExerciseRow from "../_components/exercise-row";
import { useState, useEffect } from "react";
import { useInput } from "@/hooks/use-input";
import { LuEye, LuArrowUp, LuSearch, LuPlus } from "react-icons/lu";
import Link from "next/link";
import LabelIcon from "@/app/_components/label-icon";

export default function Exercises() {
  const { exercises, sortAsc, setSortAsc } = useExerciseList();

  const [filteredExercises, setFilteredExercises] = useState<
    ExerciseInfo[] | null
  >(null);
  const { value: searchInput, onChange: changeSearchInput } = useInput("");

  useEffect(() => {
    filterExercises(searchInput);
  }, [searchInput, exercises]);

  const resetExercises = () => {
    exercises && setFilteredExercises(exercises);
  };

  const filterExercises = (searchInput: string) => {
    if (exercises) {
      const filtered = exercises.filter((exercise) => {
        return exercise.title
          ?.toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredExercises(filtered);
    } else {
      resetExercises();
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 [&_*]:transition-all [&_*]:ease-out">
      <div className="flex gap-8 items-center px-4">
        <div className="flex gap-8 items-center">
          <div className="w-96 stack">
            <input
              type="text"
              value={searchInput}
              className="z-0 w-full h-10 bg-gray-50 rounded-full transition-all ease-in-out focus:outline-none ps-14 focus:scale-y-[1.02]"
              onChange={changeSearchInput}
            />
            <div className="flex z-10 justify-center justify-self-start items-center w-12 h-12 bg-gray-400 rounded-full">
              <LuSearch size={20} />
            </div>
          </div>
        </div>
        {exercises ? (
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <LuEye size={18} />
            {filteredExercises?.length != exercises.length && (
              <>
                <p>{filteredExercises?.length}</p>
                <p className="px-1 text-lg">{"/"}</p>
              </>
            )}
            <p>{exercises.length}</p>
          </div>
        ) : (
          <div className="w-4 h-4 bg-black rounded-full animate-pulse"></div>
        )}
        <div className="grow" />
        <Link href={"./new-exercise-form"}>
          <LabelIcon icon={<LuPlus size={24} />} label="New" />
        </Link>
      </div>
      <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-tl-xl rounded-br-xl">
        <div className="grid grid-cols-[2fr,1fr,1fr,3rem] text-lg font-semibold min-w-[64vw]">
          <div className="flex col-start-1 gap-4 items-center h-10 text-lg font-semibold ps-4">
            <h1>Title</h1>
            <button
              className={`stack hover:scale-[1.02] transform ${sortAsc ? "rotate-180" : "rotate-0"}`}
              onClick={() => setSortAsc(!sortAsc)}
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <LuArrowUp size={18} />
            </button>
          </div>
          <div className="col-start-2 justify-self-end">
            <h1>Category</h1>
          </div>
          <div className="col-start-3 justify-self-end pe-4">
            <h1>Difficulty</h1>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {filteredExercises?.map((exercise) => {
            return <ExerciseRow key={exercise.id} exercise={exercise} />;
          })}
        </div>
      </div>
    </div>
  );
}
