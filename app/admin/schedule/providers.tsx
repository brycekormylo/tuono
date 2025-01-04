import { AppointmentProvider } from "@/contexts/appointments";
import { PatientProvider } from "@/contexts/patients";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<AppointmentProvider>
			<PatientProvider>{children}</PatientProvider>
		</AppointmentProvider>
	);
}
