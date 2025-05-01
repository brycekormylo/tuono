"use client";

import { useConversations } from "@/contexts/conversations";
import { useEffect, useState } from "react";
import { LuSend } from "react-icons/lu";

export default function MessageInput() {
	const { newMessage, changeNewMessage, send, selected, setShowOptions } =
		useConversations();

	const [error, setError] = useState<string | null>();

	const handleSubmit = () => {
		if (newMessage === "") {
			setError("Message can't be empty");
			return;
		}
		if (!selected) {
			setError("No conversation selected");
			return;
		}
		send();
	};

	useEffect(() => {
		newMessage !== "" && setError(null);
	}, [newMessage]);

	useEffect(() => {
		setError(null);
	}, []);

	const handleFocus = () => {
		setShowOptions(false);
	};

	return (
		selected && (
			<div className="justify-self-end self-end stack">
				<div className="flex items-center">
					<div className="grow" />
					{error && (
						<label htmlFor="message" className="px-4 text-sm text-error">
							{error}
						</label>
					)}

					<textarea
						name="message"
						id="message"
						wrap="soft"
						rows={14}
						cols={10}
						value={newMessage}
						onFocus={handleFocus}
						className={`self-end pt-4 w-[36rem] h-48 rounded-xl resize-none text-start rounded-input border-[2px] ${error ? "border-error" : "border-light-900"}`}
						onChange={changeNewMessage}
					/>
				</div>

				<button
					type="button"
					onClick={handleSubmit}
					className="justify-self-end self-end m-4 w-16 h-12 rounded-xl stack bg-primary-100 hover:bg-primary-300"
				>
					<LuSend size={20} />
				</button>
			</div>
		)
	);
}
