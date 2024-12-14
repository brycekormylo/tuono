import { BodyPart, formatEnumValue } from "@/contexts/exercises";
import Select from "react-select";

interface BodyPartInputProps {
	selectedParts: BodyPart[];
	setSelectedParts: (input: BodyPart[]) => void;
}

export default function BodyPartInput({
	selectedParts,
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
			<label htmlFor="body-part-input" className="text-xl">
				Body Parts
			</label>
			<Select
				id="body-part-input"
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
						label: formatEnumValue(key.toLowerCase()),
						value: key.toUpperCase(),
					};
				})}
				defaultValue={selectedParts.map((part) => {
					return {
						label: formatEnumValue(part),
						value: part.toUpperCase(),
					};
				})}
				styles={customStyles}
			/>
		</div>
	);
}
