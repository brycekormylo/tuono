import { ReactNode } from "react";
import { PatientListProvider } from "@/contexts/patient-list";

export function Providers({ children }: { children: ReactNode }) {
  return <PatientListProvider>{children}</PatientListProvider>;
}
