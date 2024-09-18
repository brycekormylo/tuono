"use client";

import { useDatabase } from "@/contexts/database";
import { useAuth } from "@/contexts/auth";
import { tx } from "@instantdb/react";
import { ExerciseInfo } from "./exercise-list";
import { useInput } from "@/hooks/use-input";
import { ChangeEvent } from "react";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

export interface RoutineListData {
  id: String;
  routines: Routine[];
}

export interface Routine {
  id: string;
  name: string;
  steps: AnnotatedExercise[];
  creationDate: string;
}

export interface AnnotatedExercise {
  exercise: ExerciseInfo;
  note?: string;
}

interface RoutineListContextProps {
  sortAsc: boolean;
  setSortAsc: (asc: boolean) => void;
  selectedRoutine: Routine | null;
  setSelectedRoutine: (routine: Routine | null) => void;
  searchInput: string;
  changeSearchInput: (input: ChangeEvent<HTMLInputElement>) => void;
  routines: Routine[] | null;
  updateRoutine: (routine: Routine) => void;
  removeRoutine: (routine: Routine) => void;
}

const RoutineListContext = createContext<RoutineListContextProps | null>(null);

interface RoutineListProviderProps {
  children: ReactNode;
}

const RoutineListProvider = ({ children }: RoutineListProviderProps) => {
  const { database } = useDatabase();
  const { user } = useAuth();

  const [rawRoutines, setRawRoutines] = useState<Routine[] | null>(null);
  const [routines, setRoutines] = useState<Routine[] | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);

  const query = {
    routines: {
      $: {
        where: {
          adminID: user?.id,
        },
      },
    },
  };

  const { isLoading, error, data } = database.useQuery(query);
  const { value: searchInput, onChange: changeSearchInput } = useInput("");

  useEffect(() => {
    if (data) {
      const rawRoutineData: Routine[] = data.routines as Routine[];
      setRawRoutines(rawRoutineData);
    } else {
      setRawRoutines(null);
    }
  }, [data]);

  useEffect(() => {
    sort();
  }, [sortAsc]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (searchInput == "") {
      setRoutines(rawRoutines);
    } else {
      filterBy(searchInput);
    }
  }, [searchInput, rawRoutines]); // eslint-disable-line react-hooks/exhaustive-deps

  const filterBy = (input: string) => {
    if (rawRoutines) {
      const filtered = rawRoutines.filter((routine) => {
        return routine.name?.toLowerCase().includes(input.toLowerCase());
      });
      setRoutines(filtered);
    }
  };

  const sort = () => {
    if (rawRoutines) {
      const sorted = rawRoutines.sort((a, b) => {
        if (sortAsc) {
          return a.name > b.name ? -1 : 1;
        } else {
          return a.name < b.name ? -1 : 1;
        }
      });
      setRoutines([...sorted]);
    }
  };

  const removeRoutine = (routine: Routine) => {
    database.transact(tx.routines[routine.id].update(routine as any));
    user &&
      database.transact(tx.routines[routine.id].link({ adminID: user.id }));
  };

  const updateRoutine = (routine: Routine) => {
    database.transact(tx.routines[routine.id].delete());
  };

  return (
    <RoutineListContext.Provider
      value={{
        sortAsc,
        setSortAsc,
        searchInput,
        changeSearchInput,
        selectedRoutine,
        setSelectedRoutine,
        routines,
        updateRoutine,
        removeRoutine,
      }}
    >
      {children}
    </RoutineListContext.Provider>
  );
};

const useRoutineList = () => {
  const context = useContext(RoutineListContext);

  if (!context) {
    throw new Error("useRoutineList must be used within a RoutineListProvider");
  }
  return context;
};

export { RoutineListProvider, useRoutineList };
