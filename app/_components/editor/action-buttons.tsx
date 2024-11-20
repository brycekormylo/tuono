import { LuX, LuCheck } from "react-icons/lu";

interface ActionButtonsProps {
  handleReturn: () => void;
  handleSubmit: () => void;
}

export default function ActionButtons({
  handleReturn,
  handleSubmit,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-2 justify-end items-center pt-4">
      <button
        type="button"
        className="flex gap-2 justify-between items-center px-4 h-12 rounded-xl hover:bg-gray-300 bg-gray-300/20"
        onClick={handleReturn}
      >
        <label>Cancel</label>
        <LuX size={24} />
      </button>
      <button
        type="button"
        className="flex gap-2 justify-between items-center px-4 h-12 bg-gray-50 rounded-xl hover:bg-white ring-gray-300/50 ring-[1px]"
        onClick={handleSubmit}
      >
        <label>Submit</label>
        <LuCheck size={24} />
      </button>
    </div>
  );
}
