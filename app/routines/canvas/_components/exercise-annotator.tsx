import {
  ExerciseInfo,
  Difficulty,
  formatEnumValue,
} from "@/contexts/exercise-list";
import { useState, useEffect, ChangeEvent } from "react";
import { useRoutineList, AnnotatedExercise } from "@/contexts/routine-list";
import { LuPlus, LuX } from "react-icons/lu";
import { id } from "@instantdb/react";
import { useTextArea } from "@/hooks/use-text-area";

interface ExerciseAnnotatorProps {
  addAnnotatedExerciseToRoutine: (exercise: AnnotatedExercise) => void;
}

export default function ExerciseAnnotator({
  addAnnotatedExerciseToRoutine,
}: ExerciseAnnotatorProps) {
  const { step, setStep } = useRoutineList();

  const [rawExercise, setRawExercise] = useState<ExerciseInfo>({ id: id() });
  const { value: exerciseNotes, onChange: changeExerciseNotes } =
    useTextArea("");

  useEffect(() => {
    step ? setRawExercise(step) : setRawExercise({ id: id() });
  }, [step]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newExercise = {
      ...rawExercise,
      [name]: value,
    };
    setRawExercise(newExercise);
  };

  const handleSubmit = () => {
    if (step != null) {
      const newAnnotated: AnnotatedExercise = {
        exercise: rawExercise,
        note: exerciseNotes,
      };
      addAnnotatedExerciseToRoutine(newAnnotated);
    }
    setStep(null);
  };

  const handleDiscard = () => {
    setStep(null);
  };

  const properties = [
    { key: "sets", label: "Sets", value: rawExercise.sets },
    {
      key: "repetitions",
      label: "Repetitions",
      value: rawExercise.repetitions,
    },
    { key: "weight", label: "Weight", value: rawExercise.weight },
    {
      key: "holdTimesInSeconds",
      label: "Time",
      value: rawExercise.holdTimeInSeconds,
    },
  ];

  return (
    <div className="flex gap-8">
      <div className="flex flex-col gap-8 p-4 bg-gray-100 rounded-tl-xl rounded-br-xl">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4 items-start p-4">
            <div className="flex justify-between items-center w-full">
              <h1 className="text-3xl">{rawExercise.title}</h1>
              <div className="flex gap-2 items-center">
                <div
                  className={`h-4 w-4 rounded-full ${rawExercise.difficulty == Difficulty.EASY ? "bg-green-500" : rawExercise.difficulty == Difficulty.MEDIUM ? "bg-yellow-500" : "bg-red-500"}`}
                />
                <p className="text-gray-500">
                  {formatEnumValue(rawExercise.difficulty?.toString())}
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              {rawExercise.bodyParts?.map((part, index) => {
                return (
                  <div
                    key={index}
                    className="py-1 px-2 text-sm bg-gray-200 rounded-lg"
                  >
                    <p>{part && formatEnumValue(part.toString())}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-evenly">
            {properties.map(({ key, label, value }) => (
              <div
                key={key}
                className="flex flex-col-reverse gap-1 items-center w-24 h-24"
              >
                <input
                  type="number"
                  inputMode="numeric"
                  id={key}
                  name={key.toString()}
                  value={value}
                  onChange={handleChange}
                  className="peer h-12 px-2 w-20 bg-gray-200 rounded-xl text-center text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none focus:scale-[1.02]"
                />
                <label
                  className="py-1 px-3 text-sm bg-transparent rounded-full peer-[:focus]:bg-gray-200"
                  htmlFor={key}
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 w-96 bg-gray-200 rounded-xl stack">
          <textarea
            value={exerciseNotes}
            rows={3}
            cols={40}
            className="self-start p-6 w-full bg-transparent rounded-md outline-none resize-none peer"
            onChange={changeExerciseNotes}
          />
          <div className="flex z-10 justify-self-start self-start p-2 text-gray-400 pointer-events-none peer-focus:opacity-0">
            <h2 className="text-lg">Notes</h2>
          </div>
        </div>
        <div className="flex gap-4 justify-end p-4 w-full">
          <button
            onClick={handleDiscard}
            type="submit"
            className="w-24 h-12 bg-gray-50 rounded-full stack"
          >
            <LuX size={24} />
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-36 h-12 bg-gray-50 rounded-full stack"
          >
            <LuPlus size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
