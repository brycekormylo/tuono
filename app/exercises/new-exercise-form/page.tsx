"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Select from "react-select";
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
import { v4 } from "uuid";

export default function NewExerciseForm() {
  const { addExercise } = useExerciseList();
  const router = useRouter();

  const [selectedParts, setSelectedParts] = useState<BodyPart[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [steps, setNewSteps] = useState<string[]>([]);

  useEffect(() => {
    setBodyParts(selectedParts);
  }, [selectedParts]);

  useEffect(() => {
    setImages(imageUrls);
  }, [imageUrls]);

  useEffect(() => {
    setSteps(steps);
  }, [steps]);

  const [newExercise, setNewExercise] = useState<ExerciseInfo>({
    id: v4(),
    difficulty: Difficulty.EASY,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`${name}, ${value}`);

    setNewExercise((prevState: ExerciseInfo) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDifficultyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewExercise((prevState: ExerciseInfo) => ({
      ...prevState,
      difficulty: e.target.value as Difficulty,
    }));
  };

  const setBodyParts = (newParts: BodyPart[]) => {
    setNewExercise((prevState: ExerciseInfo) => ({
      ...prevState,
      bodyParts: newParts,
    }));
  };

  const setImages = (newImages: string[]) => {
    setNewExercise((prevState: ExerciseInfo) => ({
      ...prevState,
      imageUrls: newImages,
    }));
  };
  const setSteps = (newSteps: string[]) => {
    setNewExercise((prevState: ExerciseInfo) => ({
      ...prevState,
      steps: newSteps,
    }));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addExercise(newExercise);
    router.push("/exercises/exercise-list");
  };

  const handleCancel = () => {
    router.push("/exercises/exercise-list");
  };

  const customStyles = {
    menu: (provided: any, state: any) => ({
      ...provided,
      width: "16rem",
      color: state.selectProps.menuColor,
      padding: 8,
    }),
    container: (provided: any, state: any) => ({
      ...provided,
      width: "24rem",
      color: state.selectProps.menuColor,
    }),
    valueContainer: (provided: any, state: any) => ({
      ...provided,
      width: "24rem",
      color: state.selectProps.menuColor,
      padding: 12,
    }),
  };

  const properties = [
    { key: "sets", label: "Sets", value: newExercise.sets },
    {
      key: "repetitions",
      label: "Repetitions",
      value: newExercise.repetitions,
    },
    { key: "weight", label: "Weight", value: newExercise.weight },
    {
      key: "holdTimesInSeconds",
      label: "Hold Time",
      value: newExercise.holdTimesInSeconds,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-8 justify-start items-end p-16 bg-gray-50 rounded-tl-xl rounded-br-xl lg:min-w-[64rem]">
      <div className="flex flex-col gap-4 items-start self-start">
        <h2 className="text-2xl">New Exercise</h2>
        <ImageInput imageUrls={imageUrls} setImageUrls={setImageUrls} />
      </div>
      <form className="row-start-1 col-start-2 flex flex-col gap-8 items-end w-full [&_*]:transition-all [&_*]:ease-in-out">
        <div className="flex flex-row-reverse gap-2 justify-between items-center h-full">
          <input
            type="text"
            name="title"
            value={newExercise.title}
            className="py-4 px-6 bg-gray-100 rounded-full outline-none peer focus:scale-[1.02]"
            onChange={handleChange}
          />
          <label className="py-1 px-3 text-xl bg-transparent rounded-full peer-[:focus]:bg-gray-200">
            Title
          </label>
        </div>
        <div className="flex flex-row-reverse gap-2 justify-between items-center h-full">
          <input
            className="py-4 px-6 bg-gray-100 rounded-full outline-none peer focus:scale-[1.02]"
            name="cptCode"
            type="text"
            value={newExercise.cptCode}
            onChange={handleChange}
          />
          <label className="py-1 px-3 text-xl bg-transparent rounded-full peer-[:focus]:bg-gray-200">
            CPT Code
          </label>
        </div>
        <div className="flex gap-2 justify-between items-center h-full">
          <h2 className="px-6 text-lg">Difficulty</h2>
          {Object.keys(Difficulty).map((key, index) => {
            const dif: Difficulty = Difficulty[key as keyof typeof Difficulty];
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
                  checked={newExercise.difficulty === dif}
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
        <div className="flex gap-6 items-center">
          <label className="text-xl">Body Parts</label>
          <Select
            onChange={(newValues) => {
              const newParts: BodyPart[] = newValues.map(
                (value) => BodyPart[value.label as keyof typeof BodyPart],
              );
              setSelectedParts(newParts);
            }}
            isMulti
            isSearchable
            options={Object.keys(BodyPart).map((key: string) => {
              return {
                label: key.toLowerCase(),
                value: key.toUpperCase(),
              };
            })}
            styles={customStyles}
          />
        </div>

        <div className="flex flex-row gap-2">
          {properties.map(({ key, label, value }) => (
            <div key={key} className="flex flex-col-reverse gap-3 items-center">
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
  );
}
