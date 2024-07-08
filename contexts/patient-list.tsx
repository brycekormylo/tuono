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

  useEffect(() => {
    if (user) {
      fetchPatients();
    }
  }, [user]);

  useEffect(() => {
    const syncList = async () => {
      if (patients) {
        pushPatientChanges();
      } else {
        fetchPatients();
      }
    };
    syncList();
  }, [patients]);

  const fetchPatients = async () => {
    const { data, error } = await database
      .from("patient")
      .select("patients")
      .eq("id", user?.id);
    setPatients(data ? data[0].patients : null);
  };

  const pushPatientChanges = async () => {
    const { data, error } = await database
      .from("patient")
      .update({ patients: patients })
      .eq("id", user?.id)
      .select();
  };

  const addPatient = async (newPatient: PatientInfo) => {
    setPatients(patients ? [...patients, newPatient] : [newPatient]);
  };

  const removePatient = async (patientToRemove: PatientInfo) => {
    if (patients) {
      const filteredPatients = patients.filter(
        (patient) => patient.email != patientToRemove.email,
      );
      setPatients([...filteredPatients]);
    }
  };

  const sortAsc = (asc: boolean) => {};

  const updatePatient = async (prevInfo: PatientInfo, newInfo: PatientInfo) => {
    console.log(`${prevInfo}  ${newInfo}`);
    const modifiedPatients: PatientInfo[] = [];
    if (patients) {
      patients.map((patient) => {
        if (patient.email == prevInfo.email) {
          modifiedPatients.push(newInfo);
        } else {
          modifiedPatients.push(patient);
        }
      });
      setPatients([...modifiedPatients]);
    }
  };

  return (
    <PatientListContext.Provider
      value={{
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
