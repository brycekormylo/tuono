"use client";

import { useDatabase } from "@/contexts/database";
import { useAuth } from "@/contexts/auth";
import { UUID } from "crypto";
import { ExerciseInfo } from "./exercise-list";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

export interface RoutineListData {
  id: UUID;
  routines: Routine[];
}

export interface Routine {
  id: string;
  name: string;
  exercises: AnnotatedExercise[];
}

export interface AnnotatedExercise {
  id: string;
  exercise: ExerciseInfo;
  notes?: string;
}

interface RoutineListContextProps {
  sortAsc: boolean;
  setSortAsc: (asc: boolean) => void;
  selectedRoutine: Routine | null;
  setSelected: (routine: Routine | null) => void;
  routines: Routine[] | null;
  addRoutine: (routine: Routine) => void;
  removeRoutine: (routine: Routine) => void;
  updateRoutine: (prevInfo: Routine, newInfo: Routine) => void;
}

const RoutineListContext = createContext<RoutineListContextProps | null>(null);

interface RoutineListProviderProps {
  children: ReactNode;
}

const RoutineListProvider = ({ children }: RoutineListProviderProps) => {
  const { database } = useDatabase();
  const { user } = useAuth();

  const [routines, setRoutines] = useState<Routine[] | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);

  useEffect(() => {
    if (user) {
      fetchRoutines();
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!routines) {
      fetchRoutines();
    }
  }, [routines]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    sort();
  }, [sortAsc]); // eslint-disable-line react-hooks/exhaustive-deps

  const setSelected = (routine: Routine | null) => {
    setSelectedRoutine(routine);
  };

  const sort = () => {
    if (routines) {
      const sorted = routines.sort((a, b) => {
        if (sortAsc) {
          return a.name > b.name ? -1 : 1;
        } else {
          return a.name < b.name ? -1 : 1;
        }
      });
      setRoutines([...sorted]);
    }
  };

  const fetchRoutines = async () => {
    setRoutines(null);
    const { data } = await database
      .from("routine")
      .select("routines")
      .eq("id", user?.id);
    if (data) {
      const routineList: Routine[] = data[0].routines;
      const sorted = routineList.sort((a, b) => {
        if (sortAsc) {
          return a.name > b.name ? -1 : 1;
        } else {
          return a.name < b.name ? -1 : 1;
        }
      });
      setRoutines(sorted);
    }
  };

  const pushRoutineChanges = async (newRoutines: Routine[]) => {
    const { data, error } = await database
      .from("routine")
      .update({ routines: newRoutines })
      .eq("id", user?.id)
      .select();
    await fetchRoutines();
  };

  const addRoutine = async (newRoutine: Routine) => {
    pushRoutineChanges(routines ? [...routines, newRoutine] : [newRoutine]);
  };

  const removeRoutine = async (routineToRemove: Routine) => {
    if (routines) {
      const filteredRoutines = routines.filter(
        (routine) => routine.id != routineToRemove.id,
      );
      pushRoutineChanges(filteredRoutines);
    }
  };

  const updateRoutine = async (prevInfo: Routine, newInfo: Routine) => {
    const modifiedRoutines: Routine[] = [];
    if (routines) {
      routines.map((routine) => {
        modifiedRoutines.push(routine.id == prevInfo.id ? newInfo : routine);
      });
      pushRoutineChanges(modifiedRoutines);
    }
  };

  return (
    <RoutineListContext.Provider
      value={{
        sortAsc,
        setSortAsc,
        selectedRoutine,
        setSelected,
        routines,
        addRoutine,
        removeRoutine,
        updateRoutine,
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
