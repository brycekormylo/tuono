import { ConversationProvider } from "@/contexts/conversations";
import { PatientListProvider } from "@/contexts/patient-list";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PatientListProvider>
      <ConversationProvider>{children}</ConversationProvider>
    </PatientListProvider>
  );
}
