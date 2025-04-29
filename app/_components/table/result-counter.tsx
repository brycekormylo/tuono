import { LuEye } from "react-icons/lu";
import { PulseLoader } from "react-spinners";

interface ResultCounterProps<Type> {
	rawResults: Type[] | null;
	results: Type[] | null;
}

export default function ResultCounter<Type>({
	rawResults,
	results,
}: ResultCounterProps<Type>) {
	return (
		<div className="flex gap-2 items-center">
			<LuEye size={18} />
			<PulseLoader
				color="#000000"
				size={6}
				speedMultiplier={1.6}
				loading={!rawResults}
			/>
			{rawResults && (
				<div className="flex gap-1 items-center text-sm text-dark-600">
					{rawResults?.length != results?.length && (
						<>
							<p>{results?.length}</p>
							<p className="px-1 text-lg">{"/"}</p>
						</>
					)}
					<p>{rawResults?.length}</p>
				</div>
			)}
		</div>
	);
}
