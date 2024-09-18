"use client";

import { useDatabase, Schema } from "@/contexts/database";
import { useAuth } from "@/contexts/auth";
import { init, tx, id, User, InstantReactWeb } from "@instantdb/react";
import { ChangeEvent } from "react";
import { useInput } from "@/hooks/use-input";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

export interface PatientInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface PatientListContextProps {
  sortAsc: boolean;
  setSortAsc: (asc: boolean) => void;
  selectedPatient: PatientInfo | null;
  setSelectedPatient: (patient: PatientInfo | null) => void;
  patients: PatientInfo[] | null;
  rawPatients: PatientInfo[] | null;
  searchInput: string;
  changeSearchInput: (input: ChangeEvent<HTMLInputElement>) => void;
  removePatient: (patient: PatientInfo) => void;
  updatePatient: (patient: PatientInfo) => void;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
}

const PatientListContext = createContext<PatientListContextProps | null>(null);

interface PatientListProviderProps {
  children: ReactNode;
}

const PatientListProvider = ({ children }: PatientListProviderProps) => {
  const { database } = useDatabase();
  const { user } = useAuth();

  const [rawPatients, setRawPatients] = useState<PatientInfo[] | null>(null);
  const [patients, setPatients] = useState<PatientInfo[] | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientInfo | null>(
    null,
  );
  const [editMode, setEditMode] = useState<boolean>(false);
  const { value: searchInput, onChange: changeSearchInput } = useInput("");

  const query = {
    patients: {
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
      const patientList: PatientInfo[] = data.patients as PatientInfo[];
      const sorted = patientList.sort((a, b) => {
        if (sortAsc) {
          return a.lastName > b.lastName ? -1 : 1;
        } else {
          return a.lastName < b.lastName ? -1 : 1;
        }
      });

      setRawPatients(sorted);
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    sort();
  }, [sortAsc]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (searchInput == "") {
      setPatients(rawPatients);
    } else {
      filterBy(searchInput);
    }
  }, [searchInput, rawPatients]); // eslint-disable-line react-hooks/exhaustive-deps

  const filterBy = (input: string) => {
    if (patients) {
      const filtered = patients.filter((patient) => {
        return (
          patient.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
          patient.firstName.toLowerCase().includes(searchInput.toLowerCase())
        );
      });
      setPatients(filtered);
    } else {
      setPatients(rawPatients);
    }
  };

  const sort = () => {
    if (rawPatients) {
      const sorted = rawPatients.sort((a, b) => {
        if (sortAsc) {
          return a.lastName > b.lastName ? -1 : 1;
        } else {
          return a.lastName < b.lastName ? -1 : 1;
        }
      });
      setRawPatients([...sorted]);
    }
  };

  const updatePatient = (patient: PatientInfo) => {
    database.transact(tx.patients[patient.id].update(patient as any));
    user &&
      database.transact(tx.patients[patient.id].link({ adminID: user.id }));
  };

  const removePatient = (patientToRemove: PatientInfo) => {
    database.transact(tx.patients[patientToRemove.id].delete());
  };

  return (
    <PatientListContext.Provider
      value={{
        sortAsc,
        setSortAsc,
        selectedPatient,
        setSelectedPatient,
        patients,
        rawPatients,
        searchInput,
        changeSearchInput,
        removePatient,
        updatePatient,
        editMode,
        setEditMode,
      }}
    >
      {children}
    </PatientListContext.Provider>
  );
};

const usePatientList = () => {
  const context = useContext(PatientListContext);

  if (!context) {
    throw new Error("usePatientList must be used within a PatientListProvider");
  }
  return context;
};

export { PatientListProvider, usePatientList };
