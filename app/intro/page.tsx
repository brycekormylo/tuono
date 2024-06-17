import { LuPersonStanding } from "react-icons/lu";

export default function Intro() {
  return (
    <div className="ms-32 me-[15rem] mt-20 flex flex-row h-[36rem]">
      <div className="grow flex flex-col justify-start items-start p-20">
        <h1 className="text-4xl">Welcome,</h1>
        <h2 className="text-3xl">[NAME]</h2>
        <div className="grow" />
        <div className="flex w-full justify-end">
          <div className="flex flex-row-reverse items-center gap-12 ps-12 bg-gray-100 rounded-full">
            <div className="h-24 w-24 transition-all ease-in-out rounded-full bg-gray-400 flex justify-center items-center hover:scale-[1.02]">
              <LuPersonStanding size={56} />
            </div>
            <p className="text-xl">Clients</p>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <div className="flex flex-row-reverse items-center gap-12 ps-12 bg-gray-100 rounded-full">
            <div className="h-24 w-24 transition-all ease-in-out rounded-full bg-gray-400 flex justify-center items-center hover:scale-[1.02]">
              <LuPersonStanding size={56} />
            </div>
            <p className="text-xl">Actions</p>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <div className="bg-gray-300 text-xl">
            <p>Make a new routine</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 w-[26rem] rounded-tl-[6rem] rounded-br-[6rem]"></div>
    </div>
  );
}
