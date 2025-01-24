interface EditableFieldProps {
	label: string;
	value: string;
	inputID: string;
	edit: boolean;
}

export default function EditableField({
	label,
	value,
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
				className="w-72 text-xl placeholder-gray-600 text-black outline-none disabled:placeholder-black"
				placeholder={value}
				disabled={!edit}
			/>
			{edit && <div className="w-72 bg-gray-400 rounded-full h-[2px]" />}
		</div>
	);
}
