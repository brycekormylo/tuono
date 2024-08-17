"use client";

import { useExerciseList, ExerciseInfo } from "@/contexts/exercise-list";
import {
  useRoutineList,
  AnnotatedExercise,
  Routine,
} from "@/contexts/routine-list";
import ExercisePreview from "@/app/_components/exercise-preview";
import { useState } from "react";
import { useInput } from "@/hooks/use-input";
import { List, arrayMove } from "react-movable";
import { LuSearch, LuPlus, LuX } from "react-icons/lu";
import { v4 } from "uuid";

export default function RoutineCanvas() {
  const { exercises, searchInput, changeSearchInput } = useExerciseList();
  const { routines } = useRoutineList();

  const [newRoutine, setNewRoutine] = useState<Routine>({
    id: v4(),
    name: "",
    exercises: [],
  });
  const { value: nameInput, onChange: changeNameInput } = useInput("");

  const [exerciseStep, setExerciseStep] = useState<ExerciseInfo | null>(null);
  const { value: exerciseNotes, onChange: changeExerciseNotes } = useInput("");
  const [annotatedExerciseList, setAnnotatedExerciseList] = useState<
    AnnotatedExercise[]
  >([]);

  const addAnnotatedExerciseToRoutine = () => {
    if (exerciseStep) {
      const newAnnotatedExercise: AnnotatedExercise = {
        id: v4(),
        exercise: exerciseStep,
        notes: exerciseNotes,
      };
      setAnnotatedExerciseList([
        ...annotatedExerciseList,
        newAnnotatedExercise,
      ]);
      // setNewRoutine((prevState: Routine) => ({
      //   ...prevState,
      //   exercises: [...prevState.exercises, newAnnotatedExercise],
      // }));
    }
  };

  const removeExercise = (exerciseToRemove: ExerciseInfo) => {
    const filtered = [...newRoutine.exercises].filter(
      (exercise: ExerciseInfo) => exercise.id != exerciseToRemove.id,
    );
    setAnnotatedExerciseList(filtered);
    // setNewRoutine((prevState: Routine) => ({
    //   ...prevState,
    //   exercises: filtered,
    // }));
  };

  return (
    <div className="flex flex-col gap-8 items-end p-4 grow">
      <div className="flex gap-8 justify-end items-center px-4">
        <h1 className="text-4xl ps-8">Routines</h1>
        <div className="grow" />
      </div>
      <div className="flex gap-8 justify-between p-8 w-full bg-gray-50 rounded-tl-2xl rounded-br-2xl">
        <div className="flex justify-between items-start p-4 bg-gray-200 grow">
          <div className="flex flex-col gap-4 p-4 bg-gray-100">
            <div className="flex gap-2 items-center">
              <h2 className="text-lg">Name</h2>
              <input
                type="text"
                value={nameInput}
                className="z-0 w-64 h-12 bg-transparent border-gray-400 outline-none ps-6 border-b-[2px] peer focus:scale-[1.02]"
                onChange={changeNameInput}
              />
            </div>
            <h2>Selected Exercises</h2>
            <List
              values={annotatedExerciseList}
              onChange={({ oldIndex, newIndex }) =>
                setAnnotatedExerciseList(
                  arrayMove(annotatedExerciseList, oldIndex, newIndex),
                )
              }
              renderList={({ children, props }) => (
                <ul className="p-2" {...props}>
                  {children}
                </ul>
              )}
              renderItem={({ value, props, index }) => (
                <li className="p-8 my-4 bg-gray-200" {...props}>
                  <div className="flex gap-4 items-center">
                    <p>{index}.</p>
                    <h2>{value.exercise.title}</h2>
                    <div className="grow" />
                    <button
                      onClick={() => removeExercise(value.exercise)}
                      className="w-12 h-12 text-red-500 bg-white rounded-full stack"
                    >
                      <LuX size={24} />
                    </button>
                  </div>
                </li>
              )}
            />
          </div>
          <div className="flex flex-col gap-8 items-center p-8 max-w-96 overflow-clip">
            {exerciseStep && <ExercisePreview exercise={exerciseStep} />}
            <div className="flex gap-4 items-center w-96">
              <label className="text-lg">Notes</label>
              <input
                type="text"
                value={exerciseNotes}
                className="z-0 w-full h-12 bg-gray-50 rounded-md outline-none ps-6 peer focus:scale-[1.02]"
                onChange={changeExerciseNotes}
              />
            </div>
            <div className="flex items-end w-full">
              <button
                onClick={addAnnotatedExerciseToRoutine}
                className="w-36 h-12 bg-gray-50 rounded-full stack"
              >
                <LuPlus size={24} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-end self-end p-8 bg-gray-300 min-w-72">
          <h2 className="text-2xl">Exercises</h2>
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
          {exercises?.map((exercise, index) => {
            return (
              <button
                key={index}
                onMouseDown={() => setExerciseStep(exercise)}
                className="flex justify-between items-center px-6 w-full h-16 bg-gray-50 rounded-lg"
              >
                <p className="text-xl">{exercise.title}</p>
                <LuPlus size={24} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
