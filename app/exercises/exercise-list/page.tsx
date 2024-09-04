"use client";

import { useExerciseList } from "@/contexts/exercise-list";
import ExerciseRow from "../_components/exercise-row";
import ExerciseEditor from "../exercise-editor/page";
import { PulseLoader } from "react-spinners";
import { LuEye, LuArrowUp, LuSearch, LuPlus } from "react-icons/lu";

export default function ExerciseList() {
  const {
    rawExercises,
    exercises,
    sortAsc,
    setSortAsc,
    searchInput,
    changeSearchInput,
    editMode,
    setEditMode,
    selectedExercise,
    setSelected,
  } = useExerciseList();

  const handleNewPatient = () => {
    setEditMode(!editMode);
    setSelected(null);
  };

  return (
    <div className="flex flex-col gap-8 p-4 grow">
      <div className="flex gap-8 justify-end items-center px-4">
        <h1 className="text-4xl ps-8">Exercises</h1>
        <div className="grow" />
        <div className="flex gap-2 items-center">
          <LuEye size={18} />
          <PulseLoader
            color="#000000"
            size={12}
            speedMultiplier={1.6}
            loading={!rawExercises}
          />
          {rawExercises && (
            <div className="flex gap-1 items-center text-sm text-gray-600">
              {exercises?.length != rawExercises.length && (
                <>
                  <p>{exercises?.length}</p>
                  <p className="px-1 text-lg">{"/"}</p>
                </>
              )}
              <p>{rawExercises.length}</p>
            </div>
          )}
        </div>
        <div className="w-96 stack">
          <input
            type="text"
            value={searchInput}
            className="z-0 w-full h-14 bg-gray-50 rounded-xl border-gray-200 outline-none focus:border-gray-400 border-[1px] ps-16 peer"
            onChange={changeSearchInput}
          />
          <div className="flex z-10 justify-self-start w-full text-gray-600 pointer-events-none ps-6 peer-focus:text-gray-800">
            <LuSearch size={24} />
          </div>
        </div>
        <button
          onMouseDown={handleNewPatient}
          className={`transform ${editMode ? "rotate-45" : "rotate-0"} w-14 h-14 bg-gray-300 rounded-full stack`}
        >
          <LuPlus size={28} />
        </button>
      </div>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2 p-8 bg-gray-50 rounded-tl-2xl rounded-br-2xl min-h-96 grow">
          <div className="grid grid-cols-[1fr,1fr,1fr,1rem] items-center text-xl font-semibold">
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
            <div className="justify-self-end pe-4">
              <h1>Difficulty</h1>
            </div>
          </div>
          <div className="w-full bg-gray-300 h-[1px]" />
          <div className="flex flex-col gap-1 pt-2">
            {exercises?.map((exercise, index) => {
              return <ExerciseRow key={index} exercise={exercise} />;
            })}
          </div>
        </div>
        <div
          className={`overflow-clip min-h-96 flex justify-end ${editMode ? "w-[40rem]" : "w-0"}`}
        >
          <ExerciseEditor />
        </div>
      </div>
    </div>
  );
}
