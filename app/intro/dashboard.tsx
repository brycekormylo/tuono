export default function Dashboard() {
  return (
    <div className="flex flex-col justify-evenly p-16 h-full bg-gray-50 w-[26rem] rounded-tl-[6rem] rounded-br-[6rem]">
      <div className="flex gap-8 items-center">
        <p className="text-lg">Active Clients</p>
        <p className="text-4xl text-gray-600">6</p>
      </div>
      <div className="flex gap-8 items-center">
        <p className="text-lg">Unread Messages</p>
        <p className="text-4xl text-gray-600">3</p>
      </div>
      <div className="flex gap-8 items-center">
        <p className="text-lg">Unfinished Routines</p>
        <p className="text-4xl text-gray-600">17</p>
      </div>
    </div>
  );
}
