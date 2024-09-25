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
import { id } from "@instantdb/react";
import ExerciseSelector from "./_components/exercise-selector";
import ExerciseAnnotator from "./_components/exercise-annotator";
import Recents from "../recents/page";

export default function RoutineCanvas() {
  const { step, setStep, updateRoutine, setSelectedRoutine, setEditMode } =
    useRoutineList();

  const {
    value: nameInput,
    onChange: changeNameInput,
    setValue: setNameInput,
  } = useInput("");

  const [annotatedExerciseList, setAnnotatedExerciseList] = useState<
    AnnotatedExercise[]
  >([]);

  const addAnnotatedExerciseToRoutine = (annotated: AnnotatedExercise) => {
    setAnnotatedExerciseList([...annotatedExerciseList, annotated]);
  };

  const removeExercise = (exerciseToRemove: ExerciseInfo) => {
    const filtered = [...annotatedExerciseList].filter(
      (annotated: AnnotatedExercise) =>
        annotated.exercise.id != exerciseToRemove.id,
    );
    setAnnotatedExerciseList(filtered);
  };

  const handleSubmit = () => {
    const newRoutine: Routine = {
      id: id(),
      name: nameInput,
      steps: annotatedExerciseList,
      creationDate: new Date().toISOString(),
    };
    updateRoutine(newRoutine);
    setStep(null);
    setSelectedRoutine(null);
    setEditMode(false);
    setAnnotatedExerciseList([]);
    setNameInput("");
  };

  return (
    <div className="flex gap-2 justify-end w-full min-w-[60rem]">
      <div className="flex flex-col gap-8 items-center bg-gray-100">
        <div className="z-10 max-h-24">
          <ExerciseSelector />
        </div>
        {step && (
          <ExerciseAnnotator
            addAnnotatedExerciseToRoutine={addAnnotatedExerciseToRoutine}
          />
        )}
      </div>
      <div className="flex flex-col gap-8 p-12 bg-gray-50">
        <div className="flex gap-2 items-center w-full stack">
          <h2 className="justify-self-start w-48 text-lg text-nowrap">
            Routine Name
          </h2>
          <input
            type="text"
            value={nameInput}
            className="z-0 w-64 h-12 ps-6 peer rounded-input"
            onChange={changeNameInput}
          />
        </div>
        <h2 className="self-end text-lg">Exercises</h2>
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
            <li
              className="flex gap-4 items-center px-8 my-2 h-16 bg-gray-100"
              {...props}
            >
              <p>{index}.</p>
              <h2>{value.exercise.title}</h2>
              <div className="grow" />
              <button
                onClick={() => removeExercise(value.exercise)}
                className="w-8 h-8 text-red-500 bg-gray-200 rounded-full stack"
              >
                <LuX size={20} />
              </button>
            </li>
          )}
        />
        <button
          className="self-end w-24 h-12 bg-gray-300 rounded-lg stack"
          onClick={handleSubmit}
        >
          <LuPlus size={20} />
        </button>
      </div>
    </div>
  );
}
