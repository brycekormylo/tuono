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
		<div className="flex flex-col gap-1 h-16">
			<label htmlFor={id} className="text-sm text-gray-500">
				{label}
			</label>

			<input
				type="text"
				id={id}
				name={id}
				className="w-72 text-xl placeholder-gray-600 text-black bg-transparent outline-none disabled:placeholder-black disabled:bg-none peer"
				placeholder={placeholder ?? ""}
				value={value}
				onChange={handleInputChange}
				disabled={!edit}
			/>

			{edit && (
				<div className="w-72 bg-gray-200 rounded-full peer-focus:bg-gray-400 h-[2px]" />
			)}
		</div>
	);
}
