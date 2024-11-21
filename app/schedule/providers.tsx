import { AppointmentProvider } from "@/contexts/appointments";
import { PatientListProvider } from "@/contexts/patient-list";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppointmentProvider>
      <PatientListProvider>{children}</PatientListProvider>
    </AppointmentProvider>
  );
}
