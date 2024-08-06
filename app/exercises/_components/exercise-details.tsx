import {
  ExerciseInfo,
  BodyPart,
  Difficulty,
  formatEnumValue,
} from "@/contexts/exercise-list";
import Image from "next/image";

interface ExerciseDetailProps {
  exercise: ExerciseInfo;
}

export default function ExerciseDetails({ exercise }: ExerciseDetailProps) {
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
      label: "Time",
      value: exercise.holdTimesInSeconds,
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-4 bg-gray-100 rounded-tl-xl rounded-br-xl">
        <div className="flex flex-col gap-2">
          <div className="flex gap-8 items-center p-4">
            <h1 className="text-3xl">{exercise.title}</h1>
            <div className="flex gap-2 items-center">
              <div
                className={`h-4 w-4 rounded-full ${exercise.difficulty == Difficulty.EASY ? "bg-green-500" : exercise.difficulty == Difficulty.MEDIUM ? "bg-yellow-500" : "bg-red-500"}`}
              />
              <p className="text-gray-500">
                {formatEnumValue(exercise.difficulty?.toString())}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              {exercise.bodyParts?.map((part, index) => {
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
          <div className="flex ps-4">
            {properties.map(({ key, label, value }) => (
              <div key={key} className="flex flex-col items-center w-24 h-24">
                <h2 className="pb-1 text-sm">{label}</h2>
                <p className="flex justify-center items-center w-20 h-12 text-lg font-medium text-center bg-gray-200 rounded-full">
                  {value}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 ps-4">
            {exercise.steps?.map((step, index) => {
              return (
                <div key={index} className="flex gap-2 items-center">
                  <p className="flex justify-center items-center w-8 h-8 text-lg bg-gray-200 rounded-full">
                    {index}
                  </p>
                  <p className="w-2 text-gray-600">-</p>
                  <p>{step}</p>
                </div>
              );
            })}
          </div>
          <div className="flex gap-1 items-center p-2 pt-10">
            <label className="text-sm text-gray-600">CPT Code -</label>
            <p className="text-lg">{exercise.cptCode}</p>
          </div>
        </div>
        <div className="grow" />
        <div className="grid grid-cols-2 col-start-2 gap-4 items-start self-start">
          {exercise.imageUrls?.map((url: string, index: number) => {
            return (
              <div
                key={index}
                className="relative w-48 h-48 bg-gray-500 rounded-lg overflow-clip"
              >
                <Image
                  src={url}
                  alt={`${url}`}
                  className="object-cover"
                  fill={true}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
