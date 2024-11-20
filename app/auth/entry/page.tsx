"use client";

import { useAuth } from "@/contexts/auth";
import { useInput } from "@/hooks/use-input";

import { FormEvent } from "react";

export default function Entry() {
  const { sentEmail, sendCodeTo, signInWithCode } = useAuth();
  const { value: email, onChange: changeEmail } = useInput("");
  const { value: code, onChange: changeCode } = useInput("");

  const handleEmailSumbit = (e: FormEvent) => {
    e.preventDefault();
    sendCodeTo(email);
  };

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault();
    signInWithCode(code);
  };

  return (
    <div className="flex justify-center m-8">
      <form className="flex flex-col gap-4 items-end">
        {sentEmail == "" ? (
          <>
            <div className="flex gap-8 justify-between items-center px-8 w-full h-16 bg-gray-50 rounded-xl">
              <label className="text-gray-600" htmlFor="email">
                Email
              </label>
              <input
                className="text-lg bg-transparent outline-none text-end"
                value={email}
                onChange={changeEmail}
                name="email"
                type="email"
                required
              />
            </div>
            <button
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
              <p>{sentEmail}</p>
            </div>
            <div className="flex gap-8 justify-between items-center px-8 h-16 bg-gray-50 rounded-xl">
              <label className="text-gray-600" htmlFor="email">
                Code:
              </label>
              <input
                className="text-lg bg-transparent outline-none text-end"
                value={code}
                onChange={changeCode}
                name="code"
                type="code"
                required
              />
            </div>
            <button
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
