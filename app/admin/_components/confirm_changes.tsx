import { PopoverButtonContext } from "@/app/_components/popover/popover_button";
import type { ChangeRecord } from "@/contexts/list-context-props";
import { useContext } from "react";
import { LuArrowRight } from "react-icons/lu";

export interface PatientFormData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
}

interface ConfirmChangesProps {
	action: (e: React.FormEvent) => void;
	changeLog: ChangeRecord[];
	isNew: boolean;
}

export function camelCaseToWords(s: string) {
	const result = s.replace(/([A-Z])/g, " $1");
	return result.charAt(0).toUpperCase() + result.slice(1);
}

export default function ConfirmChanges({
	action,
	changeLog,
	isNew,
}: ConfirmChangesProps) {
	const context = useContext(PopoverButtonContext);

	const handleCancel = () => {
		context?.setShow(false);
	};

	return (
		<div className="overflow-y-scroll flex-col p-2 max-h-[48rem] w-[36rem]">
			<div className="flex flex-col gap-1 items-center self-start mt-2">
				<h2 className="text-xl">{isNew ? "Create New?" : "Save Changes?"}</h2>
				<h3 className="text-sm text-gray-500">You can edit this again later</h3>
			</div>

			<div className="flex flex-col gap-4 items-center self-start p-2 my-2">
				{changeLog.map((change) => {
					return (
						<div
							key={change?.key}
							className="flex flex-col gap-1 items-start min-w-[24rem]"
						>
							<p className="text-sm">{camelCaseToWords(change?.key ?? "")}</p>
							<div className="flex gap-4 justify-between items-center p-4 w-full text-center bg-gray-100 rounded-md">
								{!isNew && (
									<>
										<p className="w-[12rem] stack">{change?.prevElement}</p>
										<LuArrowRight size={24} />
									</>
								)}
								<p className={`${!isNew && "stack w-[12rem]"} `}>
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
