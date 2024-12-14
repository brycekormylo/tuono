"use client";

import { useAuth } from "@/contexts/auth";

import { useState, type FormEvent } from "react";

interface FormData {
	email?: string;
	code?: string;
}

function validEmail(e: string) {
	const patt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return patt.test(e);
}

export default function Entry() {
	const { submittedEmail, sendCodeTo, signInWithCode } = useAuth();
	const [emailIsValid, setEmailIsValid] = useState(true);

	const handleEmailSumbit = (e: FormEvent) => {
		e.preventDefault();
		const formData: FormData = {
			email: (document.getElementById("email") as HTMLInputElement).value,
		};
		if (formData.email && validEmail(formData.email)) {
			setEmailIsValid(true);
			sendCodeTo(formData.email);
		} else {
			setEmailIsValid(false);
		}
	};

	const handleSignIn = (e: FormEvent) => {
		e.preventDefault();
		const formData: FormData = {
			code: (document.getElementById("code") as HTMLInputElement).value,
		};
		formData.code && signInWithCode(formData.code);
	};

	return (
		<div className="flex justify-center m-8">
			<form className="flex flex-col gap-4 items-end">
				{!submittedEmail ? (
					<>
						<div
							className={`flex gap-8 justify-between items-center px-8 w-full h-16 bg-gray-50 rounded-xl ${emailIsValid ? "ring-[1px] ring-red-500" : ""}`}
						>
							<label className="text-gray-600" htmlFor="email">
								Email
							</label>
							<input
								className="text-lg bg-transparent outline-none text-end"
								name="email"
								id="email"
								type="email"
								required
							/>
						</div>
						<button
							type="button"
							className="px-6 mx-4 h-12 bg-gray-200 rounded-xl"
							onClick={handleEmailSumbit}
						>
							Send Code
						</button>
					</>
				) : (
					<>
						<div className="flex gap-8 justify-between items-center px-8 w-full h-16 bg-gray-50 rounded-xl">
							<label className="text-gray-600" htmlFor="email">
								Email
							</label>
							<p>{submittedEmail}</p>
						</div>
						<div className="flex gap-8 justify-between items-center px-8 h-16 bg-gray-50 rounded-xl">
							<label className="text-gray-600" htmlFor="code">
								Code:
							</label>
							<input
								className="text-lg bg-transparent outline-none text-end"
								name="code"
								id="code"
								type="code"
								required
							/>
						</div>
						<button
							type="button"
							className="px-6 mx-4 h-12 bg-gray-200 rounded-xl"
							onClick={handleSignIn}
						>
							Sign In
						</button>
					</>
				)}
			</form>
		</div>
	);
}
