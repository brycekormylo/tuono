import { ReactNode } from "react";

interface LabelIconProps {
  icon: ReactNode;
  label: string;
}

export default function LabelIcon({ label, icon }: LabelIconProps) {
  return (
    <div className="grid transition-all ease-in-out hover:scale-[1.02]">
      <div className="flex col-start-1 row-start-1 justify-center justify-self-center items-center self-center h-10 bg-gray-50 rounded-full ps-4 pe-16">
        <h2>{label}</h2>
      </div>
      <div className="flex col-start-1 row-start-1 justify-center justify-self-end items-center w-12 h-12 bg-gray-400 rounded-full">
        {icon}
      </div>
    </div>
  );
}
