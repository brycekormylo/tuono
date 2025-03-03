import { createContext, useEffect, useState } from "react";

interface PopoverButtonContextProps {
	show: boolean;
	setShow: (show: boolean) => void;
}

const PopoverButtonContext = createContext<PopoverButtonContextProps | null>(
	null,
);

interface PopoverButtonProps {
	popover: React.ReactNode;
	pressAction?: () => void;
	dismissAction?: () => void;
	children: React.ReactNode;
}

export default function PopoverButton({
	popover,
	pressAction,
	dismissAction,
	children,
}: PopoverButtonProps) {
	const [show, setShow] = useState(false);

	// Now if something is a popover it needs useContext(PopoverButtonContext)

	const handleDismiss = () => {
		if (dismissAction) {
			dismissAction();
		}
		setShow(false);
	};

	const handleOpen = () => {
		if (pressAction) {
			pressAction();
		}
		setShow(true);
	};

	return (
		<PopoverButtonContext.Provider value={{ show, setShow }}>
			<div className="stack">
				{show && (
					<div className="fixed top-0 right-0 bottom-0 left-0 z-50 stack">
						<button
							type="button"
							onClick={handleDismiss}
							className="z-50 w-full h-full bg-gray-200/50"
						/>
						<div className="z-50 p-4 bg-gray-50 rounded-lg stack">
							{popover}
						</div>
					</div>
				)}
				<button type="button" onClick={handleOpen} className="stack">
					{children}
				</button>
			</div>
		</PopoverButtonContext.Provider>
	);
}

export { PopoverButtonContext };
