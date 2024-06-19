import { LuPersonStanding, LuList, LuPlus } from "react-icons/lu";
import Dashboard from "./dashboard";

export default function Intro() {
  return (
    <div className="ms-32 me-[15rem] mt-20 flex flex-row h-[36rem]">
      <div className="grow h-full flex flex-col justify-start items-start pt-20 px-20">
        <h1 className="text-4xl">Welcome,</h1>
        <h2 className="text-3xl">[NAME]</h2>
        <div className="grow min-h-20" />
        <div className="flex flex-col w-full items-end gap-4 transition-all ease-in-out ">
          <div className="flex flex-row-reverse items-center gap-12 ps-12 bg-gray-100 rounded-full hover:scale-[1.02]">
            <div className="h-24 w-24 rounded-full bg-gray-400 flex justify-center items-center">
              <LuPersonStanding size={48} />
            </div>
            <p className="text-xl">Clients</p>
          </div>
          <div className="flex flex-row-reverse items-center gap-12 ps-12 bg-gray-100 rounded-full hover:scale-[1.02]">
            <div className="h-24 w-24 rounded-full bg-gray-400 flex justify-center items-center">
              <LuList size={48} />
            </div>
            <p className="text-xl">Actions</p>
          </div>
          <div className="flex flex-row-reverse items-center gap-12 ps-12 bg-gray-100 rounded-full hover:scale-[1.02]">
            <div className="h-24 w-24 rounded-full bg-gray-400 flex justify-center items-center">
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
