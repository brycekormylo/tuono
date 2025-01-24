"use client";

import { PopoverButtonContext } from "@/app/_components/popover/popover_button";
import { usePatient } from "@/contexts/patients";
import { useContext, useEffect, useState } from "react";

interface PatientFormData {
	firstName?: string;
	lastName?: string;
	email?: string;
	phone?: string;
}

interface ConfirmChangesProps {
	action: (e: React.FormEvent) => void;
	formData: PatientFormData;
}

export function camelCaseToWords(s: string) {
	const result = s.replace(/([A-Z])/g, " $1");
	return result.charAt(0).toUpperCase() + result.slice(1);
}

export default function ConfirmChanges({
	action,
	formData,
}: ConfirmChangesProps) {
	const { selected } = usePatient();
	const context = useContext(PopoverButtonContext);

	const prevData: PatientFormData = {
		firstName: selected?.profile?.firstName,
		lastName: selected?.profile?.lastName,
		email: selected?.profile?.email,
		phone: selected?.profile?.phone,
	};

	type ChangeRecord = {
		key: string;
		prevElement?: string;
		newValue: string;
	};

	const [changes, setChanges] = useState<ChangeRecord[]>([]);

	const handleCancel = () => {
		context?.setShow(false);
	};

	useEffect(() => {
		Object.entries(formData).map((element) => {
			console.log(element);
			if (element[1] === "") {
				return;
			}

			const key = element[0];
			const newValue = element[1];
			const prevElement = prevData[key as keyof typeof prevData];

			if (element[1] !== "") {
				const change: ChangeRecord = { key, prevElement, newValue };
				const newChanges = changes;
				newChanges.push(change);
				setChanges(newChanges);
			}
		});

		console.log(changes);
	}, []);

	return (
		<div className="flex-col p-2 h-auto w-[36rem]">
			<div className="flex flex-col gap-1 items-center self-start mt-2">
				<h2 className="text-xl">Save Changes?</h2>
				<h3 className="text-sm text-gray-500">This action cannot be undone</h3>
			</div>

			<div className="flex flex-col gap-1 items-center self-start p-2 mt-2 bg-gray-200">
				{changes.map((change) => {
					return (
						<div key={change?.key} className="flex gap-4 h-12">
							<p className="text-sm">{camelCaseToWords(change?.key ?? "")}</p>
							<p>{change?.prevElement}</p>
							<p>{change?.newValue}</p>
						</div>
					);
				})}
			</div>

			<div className="flex gap-4 justify-evenly items-center self-end w-full h-12">
				<button
					type="button"
					className="h-12 text-gray-700 rounded-lg border-2 border-gray-600 grow"
					onClick={handleCancel}
				>
					Cancel
				</button>

				<button
					type="button"
					className="h-12 font-bold bg-gray-600 rounded-lg grow"
					onClick={action}
				>
					Save
				</button>
			</div>
		</div>
	);
}
