import { useExercise, type Exercise } from "@/contexts/exercises";
import { useRoutine } from "@/contexts/routines";
import { LuSearch, LuPlus } from "react-icons/lu";
import { useState } from "react";

export default function ExerciseSelector() {
	const { info, search, changeSearch } = useExercise();
	const { step, setStep } = useRoutine();

	const [show, setShow] = useState(false);

	const handleFocus = () => {
		setShow(true);
		setStep(null);
	};

	const handleBlur = () => {
		setShow(false);
	};

	return (
		<div className="flex flex-col gap-4 w-96">
			<div className="w-full stack">
				<input
					type="text"
					value={search}
					className="z-0 w-full h-14 bg-gray-50 rounded-xl border-gray-200 outline-none focus:border-gray-400 border-[1px] ps-16 peer"
					onChange={changeSearch}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
				<div className="flex z-10 justify-self-start w-full text-gray-400 pointer-events-none ps-6 peer-focus:text-gray-600">
					<LuSearch size={24} />
				</div>
				<div className="flex z-10 justify-self-start text-gray-400 pointer-events-none peer-focus:opacity-0 ps-20">
					<h2 className="text-lg">Search Exercises</h2>
				</div>
			</div>
			{show &&
				info &&
				info.map((exercise, index) => {
					return (
						<button
							type="button"
							key={exercise.id}
							onMouseDown={() => setStep(exercise)}
							className="flex justify-between items-center px-6 mx-6 h-12 bg-gray-50 rounded-lg"
						>
							<p className="text-lg">{exercise.title}</p>
							<LuPlus size={24} />
						</button>
					);
				})}
		</div>
	);
}
