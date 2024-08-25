"use client";

import { useExerciseList, ExerciseInfo } from "@/contexts/exercise-list";
import {
  useRoutineList,
  AnnotatedExercise,
  Routine,
} from "@/contexts/routine-list";
import { useState } from "react";
import { useInput } from "@/hooks/use-input";
import { List, arrayMove } from "react-movable";
import { LuPlus, LuX } from "react-icons/lu";
import { v4 } from "uuid";
import ExerciseSelector from "./_components/exercise-selector";
import ExerciseAnnotator from "./_components/exercise-annotator";

export default function RoutineCanvas() {
  const { routines } = useRoutineList();

  const [newRoutine, setNewRoutine] = useState<Routine>({
    id: v4(),
    name: "",
    exercises: [],
  });
  const { value: nameInput, onChange: changeNameInput } = useInput("");

  const [step, setStep] = useState<ExerciseInfo | null>(null);

  const [annotatedExerciseList, setAnnotatedExerciseList] = useState<
    AnnotatedExercise[]
  >([]);

  const addAnnotatedExerciseToRoutine = (annotated: AnnotatedExercise) => {
    setAnnotatedExerciseList([...annotatedExerciseList, annotated]);
  };

  const removeExercise = (exerciseToRemove: ExerciseInfo) => {
    const filtered = [...newRoutine.exercises].filter(
      (annotated: AnnotatedExercise) =>
        annotated.exercise.id != exerciseToRemove.id,
    );
    setAnnotatedExerciseList(filtered);
  };

  return (
    <div className="flex flex-col gap-8 items-end p-4 grow">
      <h1 className="self-start text-4xl ps-8">Routines</h1>
      <div className="flex gap-8 justify-start w-full">
        <div className="h-full stack">
          <div className="z-10 self-start">
            <ExerciseSelector exercise={step} setExercise={setStep} />
          </div>
          {step && (
            <div className="flex z-0 flex-col p-8 mt-32 bg-gray-200 rounded-tl-2xl rounded-br-2xl">
              <ExerciseAnnotator
                exercise={step}
                addAnnotatedExerciseToRoutine={addAnnotatedExerciseToRoutine}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 p-4 bg-gray-100">
          <div className="flex gap-2 items-center">
            <h2 className="text-lg">New Routine</h2>
            <input
              type="text"
              value={nameInput}
              className="z-0 w-64 h-12 bg-transparent border-gray-400 outline-none ps-6 border-b-[2px] peer focus:scale-[1.02]"
              onChange={changeNameInput}
            />
          </div>
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
                    className="w-8 h-8 text-red-500 bg-white rounded-full stack"
                  >
                    <LuX size={24} />
                  </button>
                </div>
              </li>
            )}
          />
        </div>
      </div>
    </div>
  );
}
