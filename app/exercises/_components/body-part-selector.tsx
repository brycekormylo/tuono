import { BodyPart } from "@/contexts/exercise-list";
import Select from "react-select";

interface BodyPartInputProps {
  setSelectedParts: (input: BodyPart[]) => void;
}

export default function BodyPartInput({
  setSelectedParts,
}: BodyPartInputProps) {
  const customStyles = {
    menu: (provided: any, state: any) => ({
      ...provided,
      width: "16rem",
      color: state.selectProps.menuColor,
      padding: 8,
    }),
    container: (provided: any, state: any) => ({
      ...provided,
      width: "24rem",
      color: state.selectProps.menuColor,
    }),
    valueContainer: (provided: any, state: any) => ({
      ...provided,
      width: "24rem",
      color: state.selectProps.menuColor,
      padding: 12,
    }),
  };

  return (
    <div className="flex gap-6 items-center">
      <label className="text-xl">Body Parts</label>
      <Select
        onChange={(newValues) => {
          const newParts: BodyPart[] = newValues.map(
            (partLabel) => BodyPart[partLabel.value as keyof typeof BodyPart],
          );
          setSelectedParts(newParts);
        }}
        isMulti
        isSearchable
        options={Object.keys(BodyPart).map((key: string) => {
          return {
            label: key.toLowerCase(),
            value: key.toUpperCase(),
          };
        })}
        styles={customStyles}
      />
    </div>
  );
}
