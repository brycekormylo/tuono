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

export interface PatientInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface PatientListContextProps {
  sortAsc: boolean;
  setSortAsc: (asc: boolean) => void;
  selectedPatient: PatientInfo | null;
  setSelected: (patient: PatientInfo | null) => void;
  patients: PatientInfo[] | null;
  addPatient: (patient: PatientInfo) => void;
  removePatient: (patient: PatientInfo) => void;
  updatePatient: (prevInfo: PatientInfo, newInfo: PatientInfo) => void;
}

const PatientListContext = createContext<PatientListContextProps | null>(null);

interface PatientListProviderProps {
  children: ReactNode;
}

const PatientListProvider = ({ children }: PatientListProviderProps) => {
  const { database } = useDatabase();
  const { user } = useAuth();

  const [patients, setPatients] = useState<PatientInfo[] | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientInfo | null>(
    null,
  );

  useEffect(() => {
    if (user) {
      fetchPatients();
    }
  }, [user]);

  useEffect(() => {
    if (!patients) {
      fetchPatients();
    }
  }, [patients]);

  useEffect(() => {
    sort();
  }, [sortAsc]);

  const setSelected = (patient: PatientInfo | null) => {
    setSelectedPatient(patient);
  };

  const sort = () => {
    if (patients) {
      const sorted = patients.sort((a, b) => {
        if (sortAsc) {
          return a.lastName > b.lastName ? -1 : 1;
        } else {
          return a.lastName < b.lastName ? -1 : 1;
        }
      });
      setPatients([...sorted]);
    }
  };

  const fetchPatients = async () => {
    setPatients(null);
    const { data } = await database
      .from("patient")
      .select("patients")
      .eq("id", user?.id);
    if (data) {
      const patientList: PatientInfo[] = data[0].patients;
      const sorted = patientList.sort((a, b) => {
        if (sortAsc) {
          return a.lastName > b.lastName ? -1 : 1;
        } else {
          return a.lastName < b.lastName ? -1 : 1;
        }
      });

      setPatients(sorted);
    }
  };

  const pushPatientChanges = async (newPatients: PatientInfo[]) => {
    const { data, error } = await database
      .from("patient")
      .update({ patients: newPatients })
      .eq("id", user?.id)
      .select();
    await fetchPatients();
  };

  const addPatient = async (newPatient: PatientInfo) => {
    pushPatientChanges(patients ? [...patients, newPatient] : [newPatient]);
  };

  const removePatient = async (patientToRemove: PatientInfo) => {
    if (patients) {
      const filteredPatients = patients.filter(
        (patient) => patient.email != patientToRemove.email,
      );
      pushPatientChanges(filteredPatients);
    }
  };

  const updatePatient = async (prevInfo: PatientInfo, newInfo: PatientInfo) => {
    const modifiedPatients: PatientInfo[] = [];
    if (patients) {
      patients.map((patient) => {
        modifiedPatients.push(
          patient.email == prevInfo.email ? newInfo : patient,
        );
      });
      pushPatientChanges(modifiedPatients);
    }
  };

  return (
    <PatientListContext.Provider
      value={{
        sortAsc,
        setSortAsc,
        selectedPatient,
        setSelected,
        patients,
        addPatient,
        removePatient,
        updatePatient,
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
