"use client";

import { useAuth } from "@/contexts/auth";

export default function LoginPage() {
  const { login, signup } = useAuth();

  return (
    <div className="flex justify-center m-24">
      <div className="flex justify-center items-center bg-gray-300 rounded-3xl w-[36rem] h-[24rem]">
        <form className="flex flex-col gap-4 items-start">
          <div className="flex gap-8 bg-gray-50 rounded-full">
            <label
              className="py-4 px-8 bg-gray-200 rounded-full"
              htmlFor="email"
            >
              Email:
            </label>
            <input id="email" name="email" type="email" required />
          </div>
          <div className="flex gap-8 bg-gray-50 rounded-full">
            <label
              className="py-4 px-8 bg-gray-200 rounded-full"
              htmlFor="password"
            >
              Password:
            </label>
            <input id="password" name="password" type="password" required />
          </div>
          <div className="flex justify-between w-full">
            <button
              className="py-4 px-8 bg-gray-200 rounded-full"
              formAction={login}
            >
              Log in
            </button>
            <button
              className="py-4 px-8 bg-gray-200 rounded-full"
              formAction={signup}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
