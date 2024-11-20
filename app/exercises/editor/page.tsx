"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import {
  useExerciseList,
  ExerciseInfo,
  BodyPart,
  Difficulty,
} from "@/contexts/exercise-list";
import ImageInput from "../_components/image-input";
import StepInput from "../_components/step-input";
import AliasInput from "../_components/alias-input";
import BodyPartInput from "../_components/body-part-selector";
import { id } from "@instantdb/react";
import ActionButtons from "@/app/_components/editor/action-buttons";

const emptyExercise: ExerciseInfo = {
  id: id(),
  title: "",
  sets: 0,
  repetitions: 0,
  weight: 0,
  holdTimeInSeconds: 0,

  aliases: [],
  bodyParts: [],
  imageUrls: [],
  steps: [],
};

export default function ExerciseEditor() {
  const { edit, setEdit, update, selected, setSelected } = useExerciseList();

  const [exercise, setExercise] = useState<ExerciseInfo>(emptyExercise);

  useEffect(() => {
    if (selected != null) {
      setExercise(selected);
    } else {
      setExercise(emptyExercise);
    }
  }, [selected, edit]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExercise((prevState: ExerciseInfo) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const setBodyParts = (newParts: BodyPart[]) => {
    setExercise((prevState: ExerciseInfo) => ({
      ...prevState,
      bodyParts: newParts,
    }));
  };

  const setImages = (newImages: string[]) => {
    setExercise((prevState: ExerciseInfo) => ({
      ...prevState,
      imageUrls: newImages,
    }));
  };

  const setSteps = (newSteps: string[]) => {
    setExercise((prevState: ExerciseInfo) => ({
      ...prevState,
      steps: newSteps,
    }));
  };

  const setAliases = (newAliases: string[]) => {
    setExercise((prevState: ExerciseInfo) => ({
      ...prevState,
      aliases: newAliases,
    }));
  };

  const handleSubmit = () => {
    update(exercise);
    handleReturn();
  };

  const handleReturn = () => {
    setEdit(false);
    setSelected(null);
  };

  const properties = [
    { key: "sets", label: "Sets", value: exercise.sets },
    {
      key: "repetitions",
      label: "Repetitions",
      value: exercise.repetitions,
    },
    { key: "weight", label: "Weight", value: exercise.weight },
    {
      key: "holdTimeInSeconds",
      label: "Hold Time",
      value: exercise.holdTimeInSeconds,
    },
  ];

  return (
    <div className="flex flex-col p-4 min-w-[36rem]">
      <form className="flex flex-col gap-2 items-end">
        <div className="flex flex-row-reverse gap-2 items-center">
          <input
            type="text"
            name="title"
            value={exercise.title}
            className="px-6 w-72 h-14 rounded-lg rounded-input peer"
            onChange={handleChange}
          />
          <label className="px-4 text-2xl font-medium text-gray-600 bg-transparent ms-4 peer-[:focus]:text-gray-800">
            Title
          </label>
        </div>
        <AliasInput aliases={exercise.aliases} setAliases={setAliases} />
        <div className="flex gap-2 justify-between items-center py-4 h-full">
          <h2 className="px-6 text-lg">Difficulty</h2>
          {Object.keys(Difficulty).map((key, index) => {
            const dif: Difficulty = Difficulty[key as keyof typeof Difficulty];
            return (
              <label
                key={index}
                className="px-3 h-8 bg-gray-100 rounded-md hover:bg-gray-300 stack has-[:checked]:bg-gray-500 has-[:checked]:text-gray-50 has-[:checked]:ring-gray-50"
              >
                <input
                  type="radio"
                  name="difficulty"
                  value={key}
                  id={key}
                  checked={exercise.difficulty === dif}
                  className="hidden peer"
                  onChange={handleChange}
                />
                <p className="block font-medium cursor-pointer select-none">
                  {key}
                </p>
              </label>
            );
          })}
        </div>
        <BodyPartInput
          selectedParts={exercise.bodyParts}
          setSelectedParts={setBodyParts}
        />
        <div className="flex flex-row gap-2">
          {properties.map(({ key, label, value }) => (
            <div key={key} className="flex flex-col items-center group">
              <label
                className="py-1 px-3 text-base text-gray-600 bg-transparent rounded-full group-has-[:focus]:text-black"
                htmlFor={key}
              >
                {label}
              </label>
              <input
                type="number"
                id={key}
                name={key.toString()}
                value={value}
                onChange={handleChange}
                className="px-2 w-20 h-12 text-lg text-center outline-none rounded-input no-arrow"
              />
            </div>
          ))}
        </div>
        <div className="pt-8">
          <StepInput steps={exercise.steps} setSteps={setSteps} />
        </div>
        <div className="">
          <ImageInput imageUrls={exercise.imageUrls} setImageUrls={setImages} />
        </div>
        <ActionButtons
          handleSubmit={handleSubmit}
          handleReturn={handleReturn}
        />
      </form>
    </div>
  );
}
