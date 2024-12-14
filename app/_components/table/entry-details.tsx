import { useState, useEffect, ReactNode } from "react";

interface EntryDetailsProps {
	children: ReactNode;
}

export default function EntryDetails({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="flex justify-end w-auto overflow-clip min-h-96">
			{children}
		</div>
	);
}
