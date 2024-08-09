"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { LuCheck, LuX } from "react-icons/lu";
import {
  useExerciseList,
  ExerciseInfo,
  BodyPart,
  Difficulty,
} from "@/contexts/exercise-list";
import { useRouter } from "next/navigation";
import LabelIcon from "@/app/_components/label-icon";
import ImageInput from "../_components/image-input";
import StepInput from "../_components/step-input";
import AliasInput from "../_components/alias-input";
import BodyPartInput from "../_components/body-part-selector";
import { v4 } from "uuid";

export default function ExerciseEditor() {
  const { addExercise, selectedExercise } = useExerciseList();
  const router = useRouter();

  const [selectedParts, setSelectedParts] = useState<BodyPart[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [steps, setNewSteps] = useState<string[]>([]);
  const [aliases, setNewAliases] = useState<string[]>([]);
  const [exercise, setExercise] = useState<ExerciseInfo>({
    id: v4(),
    difficulty: Difficulty.EASY,
  });

  useEffect(() => {
    if (selectedExercise) {
      setExercise(selectedExercise);
      setImageUrls(selectedExercise.imageUrls ?? []);
      setNewSteps(selectedExercise.steps ?? []);
      setSelectedParts(selectedExercise.bodyParts ?? []);
    }
  }, [selectedExercise]);

  useEffect(() => {
    setBodyParts(selectedParts);
  }, [selectedParts]);

  useEffect(() => {
    setImages(imageUrls);
  }, [imageUrls]);

  useEffect(() => {
    setSteps(steps);
  }, [steps]);

  useEffect(() => {
    setAliases(aliases);
  }, [aliases]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setExercise((prevState: ExerciseInfo) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDifficultyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExercise((prevState: ExerciseInfo) => ({
      ...prevState,
      difficulty: e.target.value as Difficulty,
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
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addExercise(exercise);
    router.push("/exercises");
  };

  const handleCancel = () => {
    router.push("/exercices");
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
      key: "holdTimesInSeconds",
      label: "Hold Time",
      value: exercise.holdTimesInSeconds,
    },
  ];

  return (
    <div className="flex flex-col">
      <h2 className="self-end p-6 text-2xl">
        {exercise.title || "New Exercise"}
      </h2>
      <div className="grid grid-cols-2 gap-8 justify-start items-end p-16 bg-gray-50 rounded-tl-xl rounded-br-xl lg:min-w-[64rem]">
        <div className="flex flex-col gap-4 items-start self-start">
          <ImageInput imageUrls={imageUrls} setImageUrls={setImageUrls} />
        </div>
        <form className="flex flex-col col-start-2 row-start-1 gap-8 items-end w-full">
          <div className="flex flex-row-reverse gap-4 items-center">
            <input
              type="text"
              name="title"
              value={exercise.title}
              className="py-4 px-6 w-72 h-full rounded-lg border-gray-300 outline-none focus:bg-gray-50 focus:border-gray-400 bg-gray-100/75 border-[1px] peer focus:scale-[1.02]"
              onChange={handleChange}
            />
            <label className="px-4 text-2xl font-medium text-gray-600 bg-transparent ms-4 peer-[:focus]:text-gray-800">
              Title
            </label>
          </div>
          <AliasInput aliases={aliases} setAliases={setNewAliases} />
          <div className="flex flex-row-reverse gap-2 justify-between items-center h-full">
            <input
              className="px-2 w-36 h-12 bg-transparent border-b-2 border-gray-400 outline-none peer"
              name="cptCode"
              type="text"
              value={exercise.cptCode}
              onChange={handleChange}
            />
            <label className="py-1 px-3 text-lg bg-transparent bg-gray-400 peer-[:focus]:bg-gray-200">
              CPT Code
            </label>
          </div>
          <div className="flex gap-2 justify-between items-center h-full">
            <h2 className="px-6 text-lg">Difficulty</h2>
            {Object.keys(Difficulty).map((key, index) => {
              const dif: Difficulty =
                Difficulty[key as keyof typeof Difficulty];
              return (
                <label
                  key={index}
                  className="w-24 h-12 bg-gray-100 rounded-full stack has-[:checked]:bg-gray-400 has-[:checked]:text-white has-[:checked]:ring-gray-50 hover:scale-[1.02]"
                >
                  <input
                    type="radio"
                    name="difficulty"
                    value={key}
                    id={key}
                    checked={exercise.difficulty === dif}
                    className="hidden peer"
                    onChange={handleDifficultyChange}
                  />
                  <p className="block cursor-pointer select-none peer-checked:font-bold">
                    {key}
                  </p>
                </label>
              );
            })}
          </div>
          <BodyPartInput
            selectedParts={selectedParts}
            setSelectedParts={setSelectedParts}
          />
          <div className="flex flex-row gap-2">
            {properties.map(({ key, label, value }) => (
              <div
                key={key}
                className="flex flex-col-reverse gap-3 items-center"
              >
                <input
                  type="number"
                  inputMode="numeric"
                  id={key}
                  name={key.toString()}
                  value={value}
                  onChange={handleChange}
                  className="peer h-20 px-2 w-28 bg-gray-100 rounded-xl text-center text-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none focus:scale-[1.02]"
                />
                <label
                  className="py-1 px-3 text-base bg-transparent rounded-full peer-[:focus]:bg-gray-200"
                  htmlFor={key}
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
          <StepInput steps={steps} setSteps={setNewSteps} />
          <div className="flex gap-6 justify-end items-center">
            <button
              type="button"
              className="flex justify-center items-center w-12 h-12 bg-gray-400 rounded-full"
              onClick={handleCancel}
            >
              <LuX size={24} />
            </button>
            <button type="button" onClick={handleSubmit}>
              <LabelIcon label="Submit" icon={<LuCheck size={24} />} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
