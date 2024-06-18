export default function Overview() {
  const steps = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col gap-12 p-16 bg-gray-50 w-[52rem] rounded-tl-[6rem] rounded-br-[6rem]">
      <div className="flex w-full justify-between">
        <p className="text-lg">Sample Routine</p>
        <p className="text-md">Time to complete</p>
      </div>
      {steps.map((val) => (
        <div key={val}>{val}</div>
      ))}
    </div>
  );
}
