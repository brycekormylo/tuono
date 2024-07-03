"useClient";

import { LuEye } from "react-icons/lu";
import Link from "next/link";

export default async function AllPatientsButton() {
  return (
    <div>
      <Link
        href={"../patients/patient-list"}
        className="flex justify-end items-center bg-gray-50 rounded-full transition-all ease-in-out hover:scale-[1.02]"
      >
        <h2 className="px-8">All Patients</h2>
        <div className="flex justify-center items-center w-16 h-16 bg-gray-400 rounded-full">
          <LuEye size={24} />
        </div>
      </Link>
    </div>
  );
}
