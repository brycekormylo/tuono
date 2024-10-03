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
} from "react";
import { ListContextProps } from "./list-context-props";
import { Identfiable } from "@/contexts/database";

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

export interface ExerciseInfo extends Identfiable {
  title?: string;
  aliases: string[];
  bodyParts: BodyPart[];
  difficulty?: Difficulty;
  steps: string[];
  imageUrls: string[];
  sets?: number;
  repetitions?: number;
  holdTimeInSeconds?: number;
  weight?: number;
}

interface ExerciseListContextProps extends ListContextProps<ExerciseInfo> {
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

  const [rawInfo, setRawInfo] = useState<ExerciseInfo[] | null>(null);
  const [info, setInfo] = useState<ExerciseInfo[] | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [selected, setSelected] = useState<ExerciseInfo | null>(null);

  const [edit, setEdit] = useState<boolean>(false);
  const {
    value: search,
    onChange: changeSearch,
    setValue: setSearch,
  } = useInput("");

  const query = {
    exercises: {
      $: {
        where: {
          adminID: user?.id,
        },
      },
    },
  };

  const { isLoading, error, data } = database.useQuery(query);

  useEffect(() => {
    if (data) {
      const rawExerciseData: ExerciseInfo[] = data.exercises as ExerciseInfo[];
      setRawInfo(rawExerciseData);
    } else {
      setRawInfo(null);
    }
  }, [data]);

  useEffect(() => {
    if (search == "") {
      setInfo(rawInfo);
    } else {
      filterBy(search);
    }
  }, [search, rawInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  const filterBy = (input: string) => {
    if (rawInfo) {
      const filtered = rawInfo.filter((exercise) => {
        return exercise.title?.toLowerCase().includes(input.toLowerCase());
      });
      setInfo(filtered);
    }
  };

  const sort = () => {
    if (rawInfo) {
      const sorted = rawInfo.sort((a, b) => {
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
      setRawInfo([...sorted]);
    }
  };

  const toggleSort = () => {
    setSortAsc(!sortAsc);
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const clearSearch = () => {
    setSearch("");
  };

  const createNew = () => {
    setSelected(null);
    setEdit(true);
  };

  const update = (exercise: ExerciseInfo) => {
    database.transact(tx.exercises[exercise.id].update(exercise as any));
    user &&
      database.transact(tx.exercises[exercise.id].link({ adminID: user.id }));
  };

  const remove = (exercise: ExerciseInfo) => {
    database.transact(tx.exercises[exercise.id].delete());
    setSelected(null);
  };

  useEffect(() => {
    sort();
  }, [sortAsc]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ExerciseListContext.Provider
      value={{
        info,
        rawInfo,
        selected,
        setSelected,
        sortAsc,
        setSortAsc,
        toggleSort,
        search,
        setSearch,
        changeSearch,
        clearSearch,
        edit,
        setEdit,
        toggleEdit,
        createNew,
        remove,
        update,
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
