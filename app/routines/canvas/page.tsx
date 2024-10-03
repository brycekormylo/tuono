"use client";

import { ExerciseInfo, useExerciseList } from "@/contexts/exercise-list";
import {
  useRoutineList,
  AnnotatedExercise,
  Routine,
} from "@/contexts/routine-list";
import { useState } from "react";
import { useInput } from "@/hooks/use-input";
import { List, arrayMove } from "react-movable";
import { LuX } from "react-icons/lu";
import { id } from "@instantdb/react";
import ExerciseSelector from "./_components/exercise-selector";
import ExerciseAnnotator from "./_components/exercise-annotator";
import ActionButtons from "@/app/_components/editor/action-buttons";
import SearchButton from "@/app/_components/table/search-button";

export default function RoutineCanvas() {
  const { step, setStep, update, setSelected, setEdit } = useRoutineList();
  const source = useExerciseList();

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
    update(newRoutine);
    setStep(null);
    setSelected(null);
    setEdit(false);
    setAnnotatedExerciseList([]);
    setNameInput("");
  };

  const handleReturn = () => {
    setEdit(false);
    setSelected(null);
  };

  return (
    <div className="flex flex-col min-w-[64rem]">
      <div className="flex gap-2 justify-end">
        <div className="flex flex-col gap-8 items-center bg-gray-100">
          {step && (
            <ExerciseAnnotator
              addAnnotatedExerciseToRoutine={addAnnotatedExerciseToRoutine}
            />
          )}
        </div>
        <div className="flex flex-col gap-8 p-12">
          <div className="flex gap-2 items-center w-full stack">
            <label className="justify-self-start w-36 text-lg text-nowrap">
              Routine Name
            </label>
            <input
              type="text"
              value={nameInput}
              className="z-0 w-64 h-12 ps-6 peer rounded-input"
              onChange={changeNameInput}
            />
          </div>
          <h2 className="self-end text-lg">Steps</h2>
          <SearchButton source={source} />
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
          <ActionButtons
            handleSubmit={handleSubmit}
            handleReturn={handleReturn}
          />
        </div>
      </div>
    </div>
  );
}
