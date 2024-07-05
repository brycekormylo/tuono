import { useDatabase } from "@/contexts/database";
import { useAuth } from "@/contexts/auth";

export interface PatientInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const usePatientList = () => {
  const { database } = useDatabase();
  const { user } = useAuth();

  const getPatients = async (): Promise<PatientInfo[]> => {
    if (user) {
      const { data, error } = await database
        .from("patient")
        .select("patients")
        .eq("id", user?.id);

      return data ? data[0].patients : [];
    }
    return [];
  };

  const addPatient = async (newPatient: PatientInfo) => {
    if (user) {
      const patients: PatientInfo[] = await getPatients();
      if (patients) {
        const patientsToUpload = [...patients, newPatient];
        const { data, error } = await database
          .from("patient")
          .update({ patients: patientsToUpload })
          .eq("id", user?.id)
          .select();
      }
    }
  };

  const removePatient = async (patientToRemove: PatientInfo) => {
    if (user) {
      const patients: PatientInfo[] = await getPatients();
      const patientsToUpload = [
        ...patients.filter((patient) => patient.email != patientToRemove.email),
      ];
      const { data, error } = await database
        .from("patient")
        .update({ patients: patientsToUpload })
        .eq("id", user?.id)
        .select();
    }
  };

  return { getPatients, addPatient, removePatient };
};

export { usePatientList };
