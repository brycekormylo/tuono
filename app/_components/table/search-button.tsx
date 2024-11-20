import { LuSearch } from "react-icons/lu";
import { useState } from "react";
import SearchOverlay from "./search-overlay";
import { ListContextProps } from "@/contexts/list-context-props";
import { Identifiable } from "@/contexts/database";

interface SearchButtonProps<
  T extends Identifiable,
  V extends ListContextProps<any>,
> {
  source: V;
  itemAction: (element?: T) => void;
}

export default function SearchButton<
  T extends Identifiable,
  V extends ListContextProps<any>,
>({ source, itemAction }: SearchButtonProps<T, V>) {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <div className="stack">
      <button
        onClick={toggleOverlay}
        className="z-10 w-12 h-12 bg-gray-400 rounded-full stack"
      >
        <LuSearch size={24} />
      </button>
      {showOverlay && (
        <SearchOverlay
          source={source}
          itemAction={itemAction}
          toggle={toggleOverlay}
        />
      )}
    </div>
  );
}
