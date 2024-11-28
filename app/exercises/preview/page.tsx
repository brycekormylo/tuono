"use client";

import ExerciseDetailBody from "../_components/exercise-details";
import { useExerciseList } from "@/contexts/exercise-list";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

export default function ExercisePreview() {
  const { selected } = useExerciseList();

  return (
    <div className="flex flex-col gap-20 p-20 bg-gray-50">
      <Link href={"/exercises"} className="stack">
        <div className="w-16 h-16 bg-gray-300 rounded-full" />
        <LuArrowLeft size={24} />
      </Link>
      {selected && <ExerciseDetailBody exercise={selected} />}
    </div>
  );
}
