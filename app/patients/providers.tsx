import { PatientProvider } from "@/contexts/patients";

export function Providers({ children }: { children: React.ReactNode }) {
	return <PatientProvider>{children}</PatientProvider>;
}
