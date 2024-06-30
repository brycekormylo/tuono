import { LuPlus } from "react-icons/lu";
import Link from "next/link";

export default function AllClientsButton() {
  return (
    <Link
      href={"../clients/client-list"}
      className="flex justify-end items-center bg-gray-50 rounded-full transition-all ease-in-out hover:scale-[1.02]"
    >
      <h2 className="px-8">All Clients</h2>
      <div className="flex justify-center items-center w-16 h-16 bg-gray-400 rounded-full">
        <LuPlus size={24} />
      </div>
    </Link>
  );
}
