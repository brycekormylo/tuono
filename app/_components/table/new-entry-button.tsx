import { LuPlus } from "react-icons/lu";

interface NewEntryButtonProps<Type> {
  editMode: boolean;
  selectedEntry: Type | null;
  handleClick: () => void;
}

export default function NewEntryButton<Type>({
  editMode,
  selectedEntry,
  handleClick,
}: NewEntryButtonProps<Type>) {
  return (
    <button
      onMouseDown={handleClick}
      className={`w-12 h-12 bg-gray-300 rounded-full ring-gray-400 stack  ${!selectedEntry && editMode ? "disabled opacity-60" : "hover:ring-[1px]"}`}
    >
      <LuPlus size={28} />
    </button>
  );
}
