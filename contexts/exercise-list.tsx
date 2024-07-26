"use client";

import { useDatabase } from "@/contexts/database";
import { useAuth } from "@/contexts/auth";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { UUID } from "crypto";

export interface ExerciseInfo {
  id: UUID;
  name: string;
  cptCode: string;
  bodyParts: string[];
  difficulty: string;
  steps: string[];
  pictureURLs: string[];
  sets: number;
  repetitions: number;
  holdTimesInSeconds: number;
  weight: number;
}

interface ExerciseListContextProps {
  sortAsc: boolean;
  setSortAsc: (asc: boolean) => void;
  selectedExercise: ExerciseInfo | null;
  setSelected: (exercise: ExerciseInfo | null) => void;
  exercises: ExerciseInfo[] | null;
  addExercise: (exercise: ExerciseInfo) => void;
  removeExercise: (exercise: ExerciseInfo) => void;
  updateExercise: (prevInfo: ExerciseInfo, newInfo: ExerciseInfo) => void;
}

const ExerciseListContext = createContext<ExerciseListContextProps | null>(
  null,
);

interface ExerciseListProviderProps {
  children: ReactNode;
}

const ExerciseListProvider = ({ children }: ExerciseListProviderProps) => {
  const { database } = useDatabase();
  const { user } = useAuth();

  const [exercises, setExercises] = useState<ExerciseInfo[] | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseInfo | null>(
    null,
  );

  useEffect(() => {
    if (user) {
      fetchExercises();
    }
  }, [user]);

  useEffect(() => {
    if (!exercises) {
      fetchExercises();
    }
  }, [exercises]);

  useEffect(() => {
    sort();
  }, [sortAsc]);

  const setSelected = (exercise: ExerciseInfo | null) => {
    setSelectedExercise(exercise);
  };

  const sort = () => {
    if (exercises) {
      const sorted = exercises.sort((a, b) => {
        if (sortAsc) {
          return a.name > b.name ? -1 : 1;
        } else {
          return a.name < b.name ? -1 : 1;
        }
      });
      setExercises([...sorted]);
    }
  };

  const fetchExercises = async () => {
    setExercises(null);
    const { data } = await database
      .from("exercise")
      .select("exercises")
      .eq("id", user?.id);
    if (data && data[0]) {
      const exerciseList: ExerciseInfo[] = data[0].exercises;
      const sorted = exerciseList.sort((a, b) => {
        if (sortAsc) {
          return a.name > b.name ? -1 : 1;
        } else {
          return a.name < b.name ? -1 : 1;
        }
      });
      setExercises(sorted);
    } else if (user) {
      const { data } = await database.from("exercise").insert([{}]).select();
    }
  };

  const pushExerciseChanges = async (newExercises: ExerciseInfo[]) => {
    const { data, error } = await database
      .from("exercise")
      .update({ exercises: newExercises })
      .eq("id", user?.id)
      .select();
    await fetchExercises();
  };

  const addExercise = async (newExercise: ExerciseInfo) => {
    pushExerciseChanges(
      exercises ? [...exercises, newExercise] : [newExercise],
    );
  };

  const removeExercise = async (exerciseToRemove: ExerciseInfo) => {
    if (exercises) {
      // const filteredExercises = exercises.filter(
      //   (exercise) => exercise.email != exerciseToRemove.email,
      // );
      // pushExerciseChanges(filteredExercises);
    }
  };

  const updateExercise = async (
    prevInfo: ExerciseInfo,
    newInfo: ExerciseInfo,
  ) => {
    const modifiedExercises: ExerciseInfo[] = [];
    if (exercises) {
      exercises.map((exercise) => {
        // modifiedExercises.push(
        //   exercise.email == prevInfo.email ? newInfo : exercise,
        // );
      });
      pushExerciseChanges(modifiedExercises);
    }
  };

  return (
    <ExerciseListContext.Provider
      value={{
        sortAsc,
        setSortAsc,
        selectedExercise,
        setSelected,
        exercises,
        addExercise,
        removeExercise,
        updateExercise,
      }}
    >
      {children}
    </ExerciseListContext.Provider>
  );
};

const useExerciseList = () => {
  const context = useContext(ExerciseListContext);

  if (!context) {
    throw new Error(
      "useExerciseList must be used within a ExerciseListProvider",
    );
  }
  return context;
};

export { ExerciseListProvider, useExerciseList };
