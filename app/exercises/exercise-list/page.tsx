"use client";

import { useExerciseList, ExerciseInfo } from "@/contexts/exercise-list";
import ExerciseRow from "../_components/exercise-row";

import { PulseLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { useInput } from "@/hooks/use-input";
import { LuEye, LuArrowUp, LuSearch, LuPlus } from "react-icons/lu";
import Link from "next/link";

export default function ExerciseList() {
  const { exercises, sortAsc, setSortAsc } = useExerciseList();

  const [filteredExercises, setFilteredExercises] = useState<
    ExerciseInfo[] | null
  >(null);
  const { value: searchInput, onChange: changeSearchInput } = useInput("");

  useEffect(() => {
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
  }, [exercises, searchInput]);

  return (
    <div className="flex flex-col gap-8 p-4 grow">
      <div className="flex gap-8 justify-end items-center px-4">
        <h1 className="text-4xl ps-8">Exercises</h1>
        <div className="grow" />
        <Link href={"/exercises/new-exercise-form"}>
          <div className="stack">
            <div className="w-14 h-14 bg-gray-400 rounded-full" />
            <LuPlus size={28} />
          </div>
        </Link>
        <div className="flex gap-2 items-center">
          <LuEye size={18} />
          <PulseLoader
            color="#000000"
            size={12}
            speedMultiplier={1.6}
            loading={!exercises}
          />
          {exercises && (
            <div className="flex gap-1 items-center text-sm text-gray-600">
              {filteredExercises?.length != exercises.length && (
                <>
                  <p>{filteredExercises?.length}</p>
                  <p className="px-1 text-lg">{"/"}</p>
                </>
              )}
              <p>{exercises.length}</p>
            </div>
          )}
        </div>
        <div className="w-96 stack">
          <input
            type="text"
            value={searchInput}
            className="z-0 w-full h-12 bg-gray-50 rounded-full outline-none ps-6 peer focus:scale-[1.02]"
            onChange={changeSearchInput}
          />
          <div className="flex z-10 justify-center justify-self-end items-center w-14 h-14 bg-gray-400 rounded-full peer-focus:scale-[1.04] peer-focus:bg-gray-400 -me-2">
            <LuSearch size={28} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-8 bg-gray-50 rounded-tl-2xl rounded-br-2xl">
        <div className="grid grid-cols-[1fr,1fr,1fr,1rem] items-center min-w-[64vw] text-xl font-semibold">
          <div className="flex gap-4 items-center h-10 ps-8">
            <h1>Title</h1>
            <button
              className={`stack hover:scale-[1.02] transform ${sortAsc ? "rotate-180" : "rotate-0"}`}
              onMouseDown={() => setSortAsc(!sortAsc)}
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <LuArrowUp size={20} />
            </button>
          </div>
          <div className="justify-self-end pe-4">
            <h1>Category</h1>
          </div>
          <div className="justify-self-end pe-6">
            <h1>Difficulty</h1>
          </div>
        </div>
        <div className="w-full bg-gray-300 h-[1px]" />
        <div className="flex flex-col gap-1 pt-2">
          {filteredExercises?.map((exercise, index) => {
            return <ExerciseRow key={index} exercise={exercise} />;
          })}
        </div>
      </div>
    </div>
  );
}
