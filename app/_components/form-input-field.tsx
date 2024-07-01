import { ReactNode } from "react";

interface FormInputFieldProps {
  field: ReactNode;
}

export default function FormInputField({ field }: FormInputFieldProps) {
  return <div className="flex gap-4 justify-between">{field}</div>;
}
