"use client";

import { useDatabase } from "@/contexts/database";
import { useAuth } from "@/contexts/auth";
import { useInput } from "@/hooks/use-input";
import { tx } from "@instantdb/react";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  ChangeEvent,
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
  rawExercises: ExerciseInfo[] | null;
  exercises: ExerciseInfo[] | null;
  searchInput: string;
  changeSearchInput: (input: ChangeEvent<HTMLInputElement>) => void;
  removeExercise: (exercise: ExerciseInfo) => void;
  updateExercise: (exercise: ExerciseInfo) => void;
  formatEnumValue: (value?: string) => string;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
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

  const [rawExercises, setRawExercises] = useState<ExerciseInfo[] | null>(null);
  const [exercises, setExercises] = useState<ExerciseInfo[] | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseInfo | null>(
    null,
  );

  const [editMode, setEditMode] = useState<boolean>(false);
  const { value: searchInput, onChange: changeSearchInput } = useInput("");

  const query = {
    exercises: {
      $: {
        where: {
          adminId: user?.id,
        },
      },
    },
  };

  const { isLoading, error, data } = database.useQuery(query);

  useEffect(() => {
    if (data) {
      const rawExerciseData: ExerciseInfo[] = data.exercises as ExerciseInfo[];
      setRawExercises(rawExerciseData);
    } else {
      setRawExercises(null);
    }
  }, [data]);

  useEffect(() => {
    if (searchInput == "") {
      setExercises(rawExercises);
    } else {
      filterBy(searchInput);
    }
  }, [searchInput, rawExercises]); // eslint-disable-line react-hooks/exhaustive-deps

  const filterBy = (input: string) => {
    if (rawExercises) {
      const filtered = rawExercises.filter((exercise) => {
        return exercise.title?.toLowerCase().includes(input.toLowerCase());
      });
      setExercises(filtered);
    }
  };

  const sort = () => {
    if (rawExercises) {
      const sorted = rawExercises.sort((a, b) => {
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
      setRawExercises([...sorted]);
    }
  };

  const setSelected = (exercise: ExerciseInfo | null) => {
    setSelectedExercise(exercise);
  };

  const updateExercise = (exercise: ExerciseInfo) => {
    database.transact(tx.exercises[exercise.id].update(exercise));
    user &&
      database.transact(tx.exercises[exercise.id].link({ adminId: user.id }));
  };

  const removeExercise = (exercise: ExerciseInfo) => {
    database.transact(tx.exercises[exercise.id].delete());
  };

  useEffect(() => {
    sort();
  }, [sortAsc]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ExerciseListContext.Provider
      value={{
        sortAsc,
        setSortAsc,
        selectedExercise,
        setSelected,
        rawExercises,
        exercises,
        searchInput,
        changeSearchInput,
        removeExercise,
        updateExercise,
        formatEnumValue,
        editMode,
        setEditMode,
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
