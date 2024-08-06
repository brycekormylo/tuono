import { LuPersonStanding, LuList, LuPlus } from "react-icons/lu";
import Dashboard from "./dashboard";

export default function Intro() {
  return (
    <div className="flex mt-20 ms-32 h-[36rem]">
      <div className="flex flex-col justify-start items-start px-20 pt-20 h-full grow">
        <h1 className="text-4xl">Welcome,</h1>
        <h2 className="text-3xl">[NAME]</h2>
        <div className="grow min-h-20" />
        <div className="flex flex-col gap-4 items-end w-full transition-all ease-in-out">
          <div className="flex flex-row-reverse gap-12 items-center bg-gray-100 rounded-full ps-12 hover:scale-[1.02]">
            <div className="flex justify-center items-center w-24 h-24 bg-gray-400 rounded-full">
              <LuPersonStanding size={48} />
            </div>
            <p className="text-xl">Clients</p>
          </div>
          <div className="flex flex-row-reverse gap-12 items-center bg-gray-100 rounded-full ps-12 hover:scale-[1.02]">
            <div className="flex justify-center items-center w-24 h-24 bg-gray-400 rounded-full">
              <LuList size={48} />
            </div>
            <p className="text-xl">Actions</p>
          </div>
          <div className="flex flex-row-reverse gap-12 items-center bg-gray-100 rounded-full ps-12 hover:scale-[1.02]">
            <div className="flex justify-center items-center w-24 h-24 bg-gray-400 rounded-full">
              <LuPlus size={48} />
            </div>
            <p className="text-xl">New Routine</p>
          </div>
        </div>
      </div>
      <Dashboard />
    </div>
  );
}
