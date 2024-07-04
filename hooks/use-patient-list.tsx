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
      const patientsToUpload: PatientInfo[] = await getPatients();
      patientsToUpload.push(newPatient);
      const { data, error } = await database
        .from("patient")
        .update({ patients: patientsToUpload })
        .eq("id", user?.id)
        .select();
    }
  };

  return { getPatients, addPatient };
};

export { usePatientList };
