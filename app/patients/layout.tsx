import LabelIcon from "../_components/label-icon";
import { LuPlus } from "react-icons/lu";
import Link from "next/link";

export default function PatientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex justify-end items-start pt-24 ps-40 me-44">
        <div className="flex flex-col gap-12 px-16">
          <div className="flex justify-between">
            <h1 className="self-start text-4xl">Patients</h1>
            <Link href={"./new-patient-form"}>
              <LabelIcon icon={<LuPlus size={24} />} label="Add New" />
            </Link>
          </div>
          <div className="flex bg-gray-300 rounded-3xl min-h-[32rem]">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
