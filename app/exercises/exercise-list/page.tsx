"use client";

import { useExerciseList, ExerciseInfo } from "@/contexts/exercise-list";
import ExerciseRow from "../_components/exercise-row";
import { useState, useEffect } from "react";
import { useInput } from "@/hooks/use-input";
import { LuEye, LuArrowUp, LuSearch, LuPlus } from "react-icons/lu";
import Link from "next/link";
import LabelIcon from "@/app/_components/label-icon";
import ExerciseDetails from "../_components/exercise-details";

export default function ExerciseList() {
  const { exercises, sortAsc, setSortAsc } = useExerciseList();

  const [filteredExercises, setFilteredExercises] = useState<
    ExerciseInfo[] | null
  >(null);
  const { value: searchInput, onChange: changeSearchInput } = useInput("");

  useEffect(() => {
    filterExercises(searchInput);
  }, [exercises, searchInput]); // eslint-disable-line react-hooks/exhaustive-deps

  const filterExercises = (searchInput: string) => {
    if (exercises) {
      const filtered = exercises.filter((exercise) => {
        return exercise.title
          ?.toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredExercises(filtered);
    } else {
      setFilteredExercises(exercises);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex gap-8 items-center px-4">
        <div className="grow" />
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
        <div className="w-96 stack">
          <input
            type="text"
            value={searchInput}
            className="z-0 w-full h-10 bg-gray-50 rounded-full transition-all ease-in-out outline-none ps-6 peer focus:scale-[1.02]"
            onChange={changeSearchInput}
          />
          <div className="flex z-10 justify-center justify-self-end items-center w-14 h-14 bg-gray-200 rounded-full peer-focus:scale-[1.04] peer-focus:bg-gray-400 -me-2">
            <LuSearch size={28} />
          </div>
        </div>
        <Link href={"./exercises/new-exercise-form"}>
          <div className="stack hover:scale-[1.04]">
            <div className="w-14 h-14 bg-gray-400 rounded-full" />
            <LuPlus size={28} />
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-2 p-4 bg-gray-50 rounded-tl-xl rounded-br-xl">
        <div className="grid grid-cols-[2fr,1fr,1fr,3rem] items-center min-w-[64vw] text-lg font-semibold">
          <div className="flex gap-4 items-center h-10 ps-8">
            <h1>Title</h1>
            <button
              className={`stack hover:scale-[1.02] transform ${sortAsc ? "rotate-180" : "rotate-0"}`}
              onClick={() => setSortAsc(!sortAsc)}
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <LuArrowUp size={18} />
            </button>
          </div>
          <div className="justify-self-end">
            <h1>Category</h1>
          </div>
          <div className="justify-self-end pe-4">
            <h1>Difficulty</h1>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {filteredExercises?.map((exercise) => {
            return (
              <>
                <ExerciseRow key={exercise.id} exercise={exercise} />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// <ExerciseDetails exercise={exercise} />
