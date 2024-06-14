export default function Background() {
  return (
    <div className="col-start-1 col-end-1 row-start-1 row-end-1 flex flex-col w-screen h-auto justify-start items-center">
      <div className="w-full flex justify-start bg-gray-100">
        <div className="w-[94%] h-[82vh] rounded-br-[10rem] bg-gray-200"></div>
      </div>
      <div className="w-full flex justify-end bg-gray-200">
        <div className="w-[94%] h-screen rounded-tl-[10rem] bg-gray-100"></div>
      </div>
    </div>
  );
}