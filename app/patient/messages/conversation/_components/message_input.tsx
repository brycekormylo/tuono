"use client";

import { usePatientConversations } from "@/contexts/patient-conversations";
import { useEffect, useState } from "react";
import { LuSend } from "react-icons/lu";

export default function MessageInput() {
	const { newMessage, changeNewMessage, send, conversation, setShowOptions } =
		usePatientConversations();

	const [error, setError] = useState<string | null>();

	const handleSubmit = () => {
		if (newMessage === "") {
			setError("Message can't be empty");
			return;
		}
		if (!conversation) {
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
	});

	const handleFocus = () => {
		setShowOptions(false);
	};

	return (
		conversation && (
			<>
				<div className="flex justify-self-end items-center self-end">
					<div className="grow" />
					<label
						htmlFor="message"
						className={`px-4 text-sm text-red-500 ${error ? "block" : "hidden"}`}
					>
						{error}
					</label>

					<textarea
						name="message"
						id="message"
						wrap="soft"
						rows={14}
						cols={10}
						value={newMessage}
						onFocus={handleFocus}
						className={`self-end pt-4 w-[36rem] h-48 rounded-xl resize-none text-start rounded-input ring-red-300 ${error ? "ring-2" : "ring-0"}`}
						onChange={changeNewMessage}
					/>
				</div>

				<button
					type="button"
					onClick={handleSubmit}
					className="justify-self-end self-end m-2 w-16 h-12 rounded-xl hover:bg-gray-100 stack"
				>
					<LuSend />
				</button>
			</>
		)
	);
}