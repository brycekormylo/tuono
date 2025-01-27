import { PopoverButtonContext } from "@/app/_components/popover/popover_button";
import { usePatient } from "@/contexts/patients";
import { useContext, useEffect, useState } from "react";
import { LuArrowRight } from "react-icons/lu";

export interface PatientFormData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
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
		firstName: selected?.profile?.firstName ?? "",
		lastName: selected?.profile?.lastName ?? "",
		email: selected?.profile?.email ?? "",
		phone: selected?.profile?.phone ?? "",
	};

	type ChangeRecord = {
		key: string;
		prevElement?: string;
		newValue: string;
	};

	const [changes, setChanges] = useState<ChangeRecord[]>([]);
	const [isNewPatient, setIsNewPatient] = useState(false);

	const handleCancel = () => {
		context?.setShow(false);
	};

	useEffect(() => {
		if (selected?.profile?.email === "" || !selected) {
			setIsNewPatient(true);
		}
		const newChanges: ChangeRecord[] = [];
		Object.entries(formData).map((element) => {
			const key = element[0];
			const change: ChangeRecord = {
				key: key,
				prevElement: prevData[key as keyof typeof prevData],
				newValue: element[1],
			};
			if (change.prevElement !== change.newValue) {
				newChanges.push(change);
			}
		});

		setChanges(newChanges);
	}, []);

	return (
		<div className="flex-col p-2 h-auto w-[36rem]">
			<div className="flex flex-col gap-1 items-center self-start mt-2">
				<h2 className="text-xl">
					{isNewPatient ? "Create Patient?" : "Save Changes?"}
				</h2>
				{!isNewPatient && (
					<h3 className="text-sm text-gray-500">
						This action cannot be undone
					</h3>
				)}
			</div>

			<div className="flex flex-col gap-4 items-center self-start p-2 my-2">
				{changes.map((change) => {
					return (
						<div
							key={change?.key}
							className="flex flex-col gap-1 items-start w-[24rem]"
						>
							<p className="text-sm">{camelCaseToWords(change?.key ?? "")}</p>
							<div className="flex gap-4 justify-between items-center px-4 w-full h-12 bg-gray-100 rounded-md">
								{!isNewPatient && (
									<>
										<p className="w-[10rem] stack">{change?.prevElement}</p>
										<LuArrowRight size={24} />
									</>
								)}
								<p className={`${!isNewPatient && "stack"} w-[10rem] `}>
									{change?.newValue}
								</p>
							</div>
						</div>
					);
				})}
			</div>

			<div className="flex gap-4 justify-evenly items-center self-end mt-8 w-full h-12">
				<button
					type="button"
					className="h-12 text-gray-700 bg-white rounded-lg border-2 border-gray-600 grow"
					onClick={handleCancel}
				>
					Cancel
				</button>

				<button
					type="button"
					className="h-12 font-bold text-white bg-gray-600 rounded-lg grow"
					onClick={action}
				>
					Save
				</button>
			</div>
		</div>
	);
}
