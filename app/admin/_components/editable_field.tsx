interface EditableFieldProps {
	label: string;
	placeholder?: string;
	value: string;
	handleInputChange: (event: React.FormEvent<HTMLInputElement>) => void;
	inputID: string;
	edit: boolean;
}

export default function EditableField({
	label,
	placeholder,
	value,
	handleInputChange,
	inputID: id,
	edit,
}: EditableFieldProps) {
	return (
		<div className="flex flex-col">
			<label htmlFor={id} className="pb-1 text-sm text-gray-500">
				{label}
			</label>

			<input
				type="text"
				id={id}
				name={id}
				className="py-2 px-4 w-72 text-xl placeholder-gray-600 text-black bg-white rounded-t-sm outline-none disabled:placeholder-black disabled:bg-none peer"
				placeholder={placeholder ?? ""}
				value={value}
				onChange={handleInputChange}
				disabled={!edit}
			/>

			<div
				className={`${edit ? "opacity-100" : "opacity-0"} w-72 bg-gray-200 rounded-full peer-focus:bg-gray-400 h-[2px]`}
			/>
		</div>
	);
}
