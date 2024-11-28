import { LuSearch } from "react-icons/lu";
import { ReactNode, useState } from "react";
import SearchOverlay from "./search-overlay";
import { ListContextProps } from "@/contexts/list-context-props";
import { Identifiable } from "@/contexts/database";

//Should take children react node instead of hard setting style
interface SearchButtonProps<
  T extends Identifiable,
  V extends ListContextProps<any>,
> {
  source: V;
  itemAction: (element?: T) => void;
  children?: ReactNode;
}

export default function SearchButton<
  T extends Identifiable,
  V extends ListContextProps<any>,
>({ source, itemAction, children }: SearchButtonProps<T, V>) {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <div className="stack">
      <button onClick={toggleOverlay} className="z-10 stack">
        {children || (
          <div className="h-12 bg-gray-400 rounded-full">
            <LuSearch size={24} />
          </div>
        )}
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
