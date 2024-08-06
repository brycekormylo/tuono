export default function Background() {
  return (
    <div className="flex flex-col justify-start justify-self-start items-center self-start w-screen">
      <div className="flex justify-start w-full bg-gray-100">
        <div className="bg-gray-200 grow me-32 h-[52rem] rounded-br-[10rem]"></div>
      </div>
      <div className="flex justify-end w-full bg-gray-200">
        <div className="h-screen bg-gray-100 grow ms-32 rounded-tl-[10rem]"></div>
      </div>
    </div>
  );
}
