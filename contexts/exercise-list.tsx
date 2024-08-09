"use client";

import { useDatabase } from "@/contexts/database";
import { useAuth } from "@/contexts/auth";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export enum BodyPart {
  HEAD = "HEAD",
  NECK = "NECK",
  SHOULDERS = "SHOULDERS",
  UPPER_BACK = "UPPER_BACK",
  LOWER_BACK = "LOWER_BACK",
  CHEST = "CHEST",
  ABDOMEN = "ABDOMEN",
  HIPS = "HIPS",
  GROIN = "GROIN",
  THIGHS = "THIGHS",
  KNEES = "KNEES",
  CALVES = "CALVES",
  ANKLES = "ANKLES",
  FEET = "FEET",
  ARMS = "ARMS",
  ELBOWS = "ELBOWS",
  WRISTS = "WRISTS",
  HANDS = "HANDS",
  GLUTES = "GLUTES",
}

export interface ExerciseInfo {
  id: string;
  title?: string;
  aliases?: string[];
  cptCode?: string;
  bodyParts?: BodyPart[];
  difficulty?: Difficulty;
  steps?: string[];
  imageUrls?: string[];
  sets?: number;
  repetitions?: number;
  holdTimesInSeconds?: number;
  weight?: number;
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
  formatEnumValue: (value?: string) => string;
}

export function formatEnumValue(value?: string): string {
  return value
    ? value
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())
    : "";
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

  const setSelected = (exercise: ExerciseInfo | null) => {
    setSelectedExercise(exercise);
  };

  const sort = useCallback(() => {
    if (exercises) {
      const sorted = exercises.sort((a, b) => {
        if (a.title && b.title) {
          if (sortAsc) {
            return a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1;
          } else {
            return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
          }
        } else {
          return -1;
        }
      });
      setExercises([...sorted]);
    }
  }, [exercises, sortAsc]);

  const fetchExercises = useCallback(async () => {
    setExercises(null);
    const { data } = await database
      .from("exercise")
      .select("exercises")
      .eq("id", user?.id);
    if (data && data[0]) {
      const exerciseList: ExerciseInfo[] = data[0].exercises;
      const sorted = exerciseList.sort((a, b) => {
        if (a.title && b.title) {
          if (sortAsc) {
            return a.title > b.title ? -1 : 1;
          } else {
            return a.title < b.title ? -1 : 1;
          }
        } else {
          return -1;
        }
      });
      setExercises(sorted);
    } else if (user) {
      const { data } = await database.from("exercise").insert([{}]).select();
    }
  }, [database, sortAsc, user]);

  const pushExerciseChanges = async (newExercises: ExerciseInfo[]) => {
    const { data, error } = await database
      .from("exercise")
      .update({ exercises: newExercises })
      .eq("id", user?.id)
      .select();
    await fetchExercises();
  };

  const addExercise = async (newExercise: ExerciseInfo) => {
    const filtered = exercises?.filter(
      (exercise) => exercise.id != newExercise.id,
    );
    pushExerciseChanges(filtered ? [...filtered, newExercise] : [newExercise]);
  };

  const removeExercise = async (exerciseToRemove: ExerciseInfo) => {
    if (exercises) {
      const filteredExercises = exercises.filter(
        (exercise) => exercise.id != exerciseToRemove.id,
      );
      pushExerciseChanges(filteredExercises);
    }
  };

  const updateExercise = async (
    prevInfo: ExerciseInfo,
    newInfo: ExerciseInfo,
  ) => {
    const modifiedExercises: ExerciseInfo[] = [];
    if (exercises) {
      exercises.map((exercise) => {
        modifiedExercises.push(exercise.id == prevInfo.id ? newInfo : exercise);
      });
      pushExerciseChanges(modifiedExercises);
    }
  };

  useEffect(() => {
    if (user) {
      fetchExercises();
    }
  }, [user, fetchExercises]);

  useEffect(() => {
    if (!exercises) {
      fetchExercises();
    }
  }, [exercises, fetchExercises]);

  useEffect(() => {
    sort();
  }, [sort, sortAsc]);

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
        formatEnumValue,
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
